import Joi from '@hapi/joi';
import Schema from './schema';
import BookingSchema from './schema/booking';
import validator from '../utils/validator';

/** Validates Booking Input  */
export default class bookingValidator {
  /**
   * Schema to validate booking fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async booking(req, res, next) {
    const schema = Joi.object().keys({
      ...BookingSchema,
      id: Schema.id
    });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * Schema to validate booking query fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async cancel(req, res, next) {
    const schema = Joi.object().keys({
      id: Schema.id
    });
    validator(schema, req.params, res, next);
  }
}
