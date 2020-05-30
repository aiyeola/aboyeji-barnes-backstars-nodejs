import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/**
 * @class ratingValidator
 */
class ratingValidator {
  /**
   *  validate rating
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static validateRatingData(req, res, next) {
    const ratingSchema = Joi.object().keys({
      rating: Schema.rating,
      id: Schema.id
    });
    validator(ratingSchema, { ...req.body, ...req.params }, res, next);
  }
}

export default ratingValidator;
