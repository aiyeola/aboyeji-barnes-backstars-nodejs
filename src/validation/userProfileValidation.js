import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/** Validates user profile */
export default class userProfileValidator {
  /**
   * Schema to validate profile fields to update
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async checkUpdate(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Schema.nameOptional,
      lastName: Schema.nameOptional,
      gender: Schema.gender,
      language: Schema.stringOptional,
      currency: Schema.stringOptional,
      location: Schema.stringOptional,
      department: Schema.department,
      phoneNumber: Schema.phone,
      birthDate: Schema.birthDate,
      passportName: Schema.passportName,
      passportNumber: Schema.passportNumber
    });
    validator(schema, req.body, res, next);
  }
}
