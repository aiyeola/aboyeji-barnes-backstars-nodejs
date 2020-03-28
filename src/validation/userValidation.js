/* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

export default class userValidator {
  static async validateSignup(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Schema.name,
      lastName: Schema.name,
      userEmail: Schema.email,
      userPassword: Schema.password
    });
    validator(schema, req.body, res);

    next();
  }
}
