/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

class feedbackValidator {
  static validateFeedbackData(req, res, next) {
    const schema = Joi.object().keys({
      userId: Schema.number,
      accommodationId: Schema.number,
      feedback: Schema.text
    });
    validator(schema, req.body, res, next);
  }
}

export default feedbackValidator;
