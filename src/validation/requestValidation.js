import Joi from '@hapi/joi';
import Schema from './schema';
import TripSchema from './schema/trip';
import validator from '../utils/validator';

/**
 * @class requestValidation
 */
export default class requestValidator {
  /**
   * validates stats data
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async statistics(req, res, next) {
    const schema = Joi.object().keys({
      parameter: Joi.string()
        .trim()
        .valid('years', 'months', 'weeks', 'days')
        .required()
        .error(
          new Error('Parameter must be one of years, months, weeks, days')
        ),
      value: Joi.number()
        .integer()
        .required()
        .error(new Error('value must be an integer'))
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates get request entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async validateGetRequest(req, res, next) {
    const schema = Joi.object().keys({
      id: Schema.number
    });
    validator(schema, { ...req.params }, res, next);
  }

  /**
   * Validates edit trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async validateEditRequest(req, res, next) {
    const schema = Joi.object().keys({
      from: Schema.from,
      to: Schema.to,
      returnDate: Schema.minDate,
      reason: Schema.stringLongOptional,
      passportName: Schema.passportName.required(),
      passportNumber: Schema.passportNumber.required(),
      gender: Schema.gender.required()
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates request approval
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async requestApproval(req, res, next) {
    const schema = Joi.object().keys({
      reason: Schema.stringLong,
      requestId: Schema.id
    });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * Validates one way trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async oneWay(req, res, next) {
    const schema = Joi.object()
      .keys({
        ...TripSchema,
        passportName: Schema.passportName.required(),
        passportNumber: Schema.passportNumber.required(),
        gender: Schema.gender.required(),
        role: Schema.string
      })
      .options({ allowUnknown: false });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async returnTrip(req, res, next) {
    const schema = Joi.object()
      .keys({
        ...TripSchema,
        returnDate: Schema.minDate.required(),
        passportName: Schema.passportName.required(),
        passportNumber: Schema.passportNumber.required(),
        gender: Schema.gender,
        role: Schema.string
      })
      .options({ allowUnknown: false });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates multi city trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {object} validation schema
   */
  static async multiCity(req, res, next) {
    const schema = Joi.object()
      .keys({
        ...TripSchema,
        returnDate: Schema.minDate.required(),
        passportName: Schema.passportName.required(),
        passportNumber: Schema.passportNumber.required(),
        gender: Schema.gender,
        role: Schema.string
      })
      .options({ allowUnknown: false });
    validator(schema, req.body, res, next);
  }
}
