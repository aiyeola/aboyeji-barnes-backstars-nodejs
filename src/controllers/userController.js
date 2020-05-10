/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import Password from '../utils/generatePassword';
import SessionManager from '../utils/sessionManager';
import UserService from '../services/userService';
import Email from '../utils/mails/email';
import VerifyEmail from '../utils/mails/verify.email';
import ResetPasswordEmail from '../utils/mails/resetPassword.email';
import SupplierEmail from '../utils/mails/supplier.email';
import { FRONTEND_URL } from '../config';

/** Class that handles user */
class Users {
  /**
   * creates a new user
   * @param {object} req -request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  async createUser(req, res, next) {
    const rawData = req.body;
    try {
      const obj = new Password(rawData);
      const newPassword = await obj.encryptPassword();

      rawData.userPassword = newPassword;
      const data = await UserService.createUser(rawData);

      const token = SessionManager.generateToken({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        userEmail: data.userEmail,
        userRoles: data.userRoles,
        accountVerified: data.accountVerified,
        emailAllowed: data.emailAllowed
      });
      data.dataValues.userToken = token;
      delete data.dataValues.userPassword;
      delete data.dataValues.accountVerified;
      delete data.dataValues.createdAt;
      delete data.dataValues.updatedAt;

      const link = `${FRONTEND_URL}/verify/?token=${token}`;
      let verification;
      try {
        const headers = Email.header({
          to: data.dataValues.userEmail,
          subject: 'Barnes Backstars email verification link'
        });
        const msg = VerifyEmail.verificationLinkTemplate(link, data.dataValues);
        await Email.sendMail(res, headers, msg);
        verification = 'verification link sent';
      } catch (error) {
        verification = 'verification link not sent';
      }
      return Response.customResponse(
        res,
        201,
        'Account has been created successfully',
        { ...data.dataValues, verification: { message: verification, link } }
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  logs in a user
   * @param {object} req - request object
   * @param {object} res -response object
   * @param {object} next - next middleware
   * @return {object} response
   */
  async login(req, res, next) {
    try {
      const { userEmail, userPassword } = req.body;

      const userExists = await UserService.findUser({ userEmail });

      if (!userExists) {
        return Response.authenticationError(
          res,
          'Invalid email or password entered'
        );
      }
      if (userExists.accountVerified === false) {
        return Response.authenticationError(res, 'Email not verified');
      }
      const user = userExists.dataValues;

      const match = await Password.checkPasswordMatch(
        userPassword,
        user.userPassword
      );
      if (!match) {
        return Response.authenticationError(res, 'Invalid email or password');
      }
      user.userToken = await SessionManager.createSession(user, res);
      delete user.userPassword;
      delete user.accountVerified;
      delete user.createdAt;
      delete user.updatedAt;
      return Response.customResponse(
        res,
        200,
        'User signed in successfully',
        user
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * logs out a user
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @returns {object} response
   */
  async logout(req, res) {
    SessionManager.destroyToken(req.user);

    return Response.customResponse(res, 200, 'User logged out successfully');
  }

  /**
   * login a user via social account
   * @param {object} req - response object
   * @param {object} res -response object
   * @returns {string} redirect url
   */
  async socialLogin(req, res) {
    const { firstName, lastName, email: userEmail } = req.user;
    let data;
    data = await UserService.findUser({ userEmail });
    if (!data) {
      data = await UserService.createUser({
        firstName,
        lastName,
        userEmail
      });
    }
    const token = await SessionManager.createSession({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      userEmail: data.userEmail,
      userRoles: data.userRoles,
      emailAllowed: data.emailAllowed
    });
    const apiResponse = {
      status: 200,
      message: 'Successfully logged in',
      data: token
    };
    const responseBuffer = Buffer.from(JSON.stringify(apiResponse));
    return res.redirect(
      `${FRONTEND_URL}/login?code=${responseBuffer.toString('base64')}`
    );
  }

  /**
   * check the user token
   * @param {object} req - request object
   * @param {object} res -response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async checkToken(req, res, next) {
    try {
      return Response.customResponse(res, 200, 'current user', req.user);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * sends verification link
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {next} next - next middleware
   * @returns {object} custom response
   */
  async sendLink(req, res, next) {
    const { userEmail } = req.body;
    const user = await UserService.findUser({ userEmail });
    if (!user) {
      return Response.notFoundError(res, 'This email is not registered');
    }

    const token = SessionManager.generateToken(user);
    const link = `${FRONTEND_URL}/verify/?token=${token}`;
    try {
      const headers = Email.header({
        to: userEmail,
        subject: 'Barnes Backstars email verification link'
      });
      const msg = VerifyEmail.verificationLinkTemplate(link, user);
      await Email.sendMail(res, headers, msg);
      return Response.customResponse(
        res,
        200,
        'email sent with verification link',
        {
          userEmail,
          link
        }
      );
    } catch (error) {
      return next({
        message: 'error.message',
        stack: error.stack,
        status: 401
      });
    }
  }

  /**
   * verifies email
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async verify(req, res, next) {
    const { token } = req.query;

    try {
      const { userEmail } = await SessionManager.verifyToken(token);
      const user = await UserService.findUser({ userEmail });
      if (user.accountVerified) {
        return Response.conflictError(res, 'Email already verified');
      }
      await UserService.updateUser({ userEmail }, { accountVerified: true });
      const userExists = user.dataValues;
      userExists.accountVerified = true;
      const userToken = await SessionManager.createSession(userExists, res);
      return Response.customResponse(res, 201, 'Email verified successfully', {
        userEmail,
        userToken
      });
    } catch (error) {
      return next({
        message: 'error.message',
        stack: error.stack,
        status: 401
      });
    }
  }

  /**
   * sends password reset email
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next -next middleware
   * @returns {object} custom response
   */
  async requestPasswordReset(req, res, next) {
    const { email: userEmail } = req.body;
    try {
      const userAccount = await UserService.findUser({ userEmail });
      if (!userAccount) {
        return Response.notFoundError(res, 'Account not found');
      }
      const oneTimeToken = SessionManager.generateToken({
        id: userAccount.id,
        secret: `${userAccount.userPassword}-${userAccount.createdAt}`
      });
      const url = `${FRONTEND_URL}/reset-password/${userAccount.id}/${oneTimeToken}`;
      const headers = Email.header({
        to: userAccount.userEmail,
        subject: 'Barnes Backstars Password Reset'
      });
      const msg = ResetPasswordEmail.resetTemplate(url, userAccount);
      await Email.sendMail(res, headers, msg);
      return Response.customResponse(
        res,
        200,
        'If email is found, check your email for the link',
        url
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * resets user password
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async resetPassword(req, res, next) {
    const { password, newPassword } = req.body;
    const { userId, token } = req.params;
    const id = parseInt(userId, 10);
    try {
      const userAccount = await UserService.findUser({ id });
      if (!userAccount) {
        return Response.authenticationError(res, 'Forbidden Request');
      }
      const userDetails = await SessionManager.decodeToken({
        token,
        secret: `${userAccount.userPassword}-${userAccount.createdAt}`
      });
      if (password !== newPassword) {
        return Response.badRequestError(
          res,
          'Passwords do not match, re-type password'
        );
      }
      const pass = new Password({ userPassword: password });
      const userPassword = await pass.encryptPassword();
      await UserService.updateUser({ id: userDetails.id }, { userPassword });
      return Response.customResponse(
        res,
        200,
        'Password has been successfully changed. Proceed to login'
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * updates user role
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async updateUserRole(req, res, next) {
    const { userEmail, userRole } = req.body;
    let message;
    try {
      const details = await UserService.findUser({ userEmail });
      if (!details) {
        return Response.notFoundError(res, "User doesn't exist");
      }

      if (details.userRoles === 'Super Administrator') {
        return Response.badRequestError(
          res,
          "What you're trying to do cannot be achieved"
        );
      }

      if (userRole !== details.userRoles) {
        if (userRole === 'Manager') {
          const roleDetails = await UserService.findUser({
            userRoles: userRole
          });
          if (!roleDetails) {
            message = 'User Role has been successfully updated';
            await UserService.updateUser(
              { userEmail },
              { userRoles: userRole }
            );
            return Response.customResponse(res, 200, message);
          }

          await UserService.updateUser(
            { userEmail: roleDetails.userEmail },
            { userRoles: 'Requester' }
          );
          await UserService.updateUser({ userEmail }, { userRoles: userRole });
          message = `${roleDetails.firstName} ${roleDetails.lastName}'s role has been updated to Requester and the new manager role has been assigned to ${userEmail}`;
          return Response.customResponse(res, 200, message);
        }

        await UserService.updateUser({ userEmail }, { userRoles: userRole });
        return Response.customResponse(
          res,
          200,
          'Role has been updated successfully'
        );
      }

      message = 'The user already has the rights you are trying to assign';
      return Response.conflictError(res, message);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * adds a supplier
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async addSupplier(req, res, next) {
    const { userEmail, firstName, lastName } = req.body;
    try {
      const user = await UserService.findUser({
        userEmail
      });
      if (user) {
        return Response.conflictError(res, 'User already exists');
      }
      const userPassword = Password.randomPassword();
      const obj = new Password({ userPassword });
      const password = await obj.encryptPassword();
      const supplier = {
        firstName,
        lastName,
        userEmail,
        userPassword: password,
        userRoles: 'Accommodation Supplier',
        accountVerified: true
      };
      const data = await UserService.createUser(supplier);
      delete data.dataValues.accountVerified;
      delete data.dataValues.createdAt;
      delete data.dataValues.updatedAt;
      const headers = Email.header({
        to: userEmail,
        subject: 'BareFoot Accommodations'
      });
      const loginLink = `${FRONTEND_URL}/log-in`;
      const msg = SupplierEmail.supplierTemplate(
        {
          userEmail,
          firstName,
          password: userPassword
        },
        loginLink
      );
      await Email.sendMail(res, headers, msg);
      return Response.customResponse(
        res,
        201,
        'Account has been created successfully',
        { ...data.dataValues }
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Change email notification preferences
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async emailPreferences(req, res, next) {
    try {
      const { id, emailAllowed } = req.user;
      const data = await UserService.updateUser(
        { id },
        { emailAllowed: !emailAllowed }
      );
      return Response.customResponse(
        res,
        200,
        'Your email preferences have been successfully updated',
        { emailAllowed: data[1][0].emailAllowed }
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Unsubscribe from email notifications
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  async unsubscribe(req, res, next) {
    try {
      const { token } = req.query;
      const { userEmail } = await SessionManager.verifyToken(token);
      const user = await UserService.findUser({ userEmail });
      if (!user.emailAllowed) {
        return Response.conflictError(
          res,
          "You're already opted out of email notifications"
        );
      }
      const data = await UserService.updateUser(
        { userEmail },
        { emailAllowed: false }
      );
      return Response.customResponse(
        res,
        200,
        "You've opted out of email notifications successfully",
        { emailAllowed: data[1][0].emailAllowed }
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new Users();
