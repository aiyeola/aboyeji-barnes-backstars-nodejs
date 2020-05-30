import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/** validating accommodation fields, inputs and parameters */
class accommodationValidator {
  /**
   *  validate accommodation details
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static validateAccommodation(req, res, next) {
    const schema = Joi.object().keys({
      name: Schema.string,
      locationId: Schema.id,
      amenities: Schema.listArray.required(),
      services: Schema.listArray2.required(),
      description: Schema.stringLongOptional,
      image: Schema.listArray,
      lat: Joi.number().required(),
      lng: Joi.number().required()
    });
    validator(schema, req.body, res, next);
  }

  /**
   *  validate room details
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation schema
   */
  static validateRoomData(req, res, next) {
    const schema = Joi.object().keys({
      rooms: Schema.rooms,
      accommodationId: Schema.id
    });
    validator(schema, req.body, res, next);
  }

  /**
   * validate accommodation id
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object} validation schema
   */
  static async validateGetOneAccommodation(req, res, next) {
    const schema = Joi.object().keys({
      id: Schema.id
    });
    validator(schema, req.params, res, next);
  }
}

export default accommodationValidator;
