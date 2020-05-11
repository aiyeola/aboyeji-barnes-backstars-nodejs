import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/** Validates User Input  */
export default class userValidator {
  /**
   * Schema to validate signup fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateSignup(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Schema.name,
      lastName: Schema.name,
      userEmail: Schema.email,
      userPassword: Schema.password
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Schema to validate login fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateSignin(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Joi.string().required().error(new Error('email is required')),
      userPassword: Joi.string()
        .required()
        .error(new Error('password is required'))
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Schema to validate email to send link to
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateSendLink(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Schema to validate token to verify
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {next} next - next middleware
   * @returns {object} validation schema
   */
  static async validateVerifyLink(req, res, next) {
    const schema = Joi.object().keys({
      token: Schema.link
    });
    validator(schema, req.query, res, next);
  }

  /**
   * Schema to validate password
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async resetPassword(req, res, next) {
    const schema = Joi.object().keys({
      password: Schema.password,
      newPassword: Schema.password
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Schema to validate token to unsubscribe
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateUnsubscribe(req, res, next) {
    const schema = Joi.object().keys({
      token: Schema.link
    });
    validator(schema, req.query, res, next);
  }

  /**
   * Schema to validate user email & user role
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async validateUserRole(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email,
      userRole: Schema.role
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Schema to validate supplier details that admin wants to add
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async userByAdmin(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email,
      firstName: Schema.name,
      lastName: Schema.name
    });
    validator(schema, req.body, res, next);
  }
}
