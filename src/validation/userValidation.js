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
      userEmail: Joi.string()
        .required()
        .error(new Error('email is required')),
      userPassword: Joi.string()
        .required()
        .error(new Error('password is required'))
    });
    validator(schema, req.body, res, next);
  }
}
