import Joi from '@hapi/joi';
import Schema from './schema';
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
  static async bookingVal(req, res, next) {
    const schema = Joi.object().keys({
      requestId: Schema.number,
      roomId: Schema.number,
      checkIn: Schema.date,
      checkOut: Schema.date,
      createdAt: Schema.date,
      updatedAt: Schema.date
    });
    validator(schema, req.body, res, next);
  }
  /**
   * Schema to validate booking query fields
   * @param {object} req - request object.
   * @param {object} res - response object.
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static async bookingQuery(req, res, next) {
    const schema = Joi.object().keys({
      requestId: Schema.number,
      roomId: Schema.number
    });
    validator(schema, req.body, res, next);
  }
}
