import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/**
 * @class feedbackValidator
 */
class feedbackValidator {
  /**
   *  validate feedback
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static validateFeedbackData(req, res, next) {
    const schema = Joi.object().keys({
      feedback: Schema.string,
      id: Schema.id
    });

    validator(schema, { ...req.body, ...req.params }, res, next);
  }
}

export default feedbackValidator;
