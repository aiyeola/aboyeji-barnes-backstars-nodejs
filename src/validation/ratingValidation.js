/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

class ratingValidator {
  static validateRatingData(req, res, next) {
    const schema = Joi.object().keys({
      userId: Schema.number,
      rating: Schema.number
    });
    validator(schema, req.body, res, next);
  }
}

export default ratingValidator;
