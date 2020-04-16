/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Response from '../utils/response';
import Password from '../utils/generatePassword';
import SessionManager from '../utils/sessionManager';
import UserService from '../services/userService';
/** Class that handles user */
class Users {
  async createUser(req, res, next) {
    const rawData = req.body;

    try {
      // generates hashed password
      const obj = new Password(rawData);
      const newPassword = await obj.encryptPassword();
      // update data
      rawData.userPassword = newPassword;
      const data = await UserService.createUser(rawData);
      const token = await SessionManager.generateToken({
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
      return Response.customResponse(
        res,
        201,
        'Account has been created successfully',
        data.dataValues
      );
    } catch (error) {
      return next(error);
    }
  }

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
    await SessionManager.destroyToken(req.user);

    return Response.customResponse(res, 200, 'User logged out successfully');
  }

  async socialLogin(req, res) {
    const { firstName, lastName, email: userEmail } = req.user;
    const userRoles = 'Requester';
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
    // api response should be buffered into a string and sent to the frontEnd URL
    // const apiResponse = {
    //   status: 200,
    //   message: 'Successfully logged in',
    //   data: token
    // };
    return Response.customResponse(res, 200, 'Successfully logged in', token);
  }
}

export default new Users();
