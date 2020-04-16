/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

class accommodationValidator {
  static validateAccommodation(req, res, next) {
    const schema = Joi.object().keys({
      name: Schema.text,
      status: Schema.status,
      imageUrl: Schema.array,
      amenities: Schema.array,
      services: Schema.array,
      mapLocations: Schema.json,
      locationId: Schema.number,
      description: Schema.text,
      owner: Schema.number
    });
    validator(schema, req.body, res, next);
  }

  static validateRoomData(req, res, next) {
    const schema = Joi.object().keys(
      {
        name: Joi.string().required(),
        type: Joi.string().required(),
        accommodationId: Joi.string().alphanum().required(),
        status: Joi.boolean().required(),
        price: Joi.number().required()
      },
      {}
    );
    validator(schema, req.body, res, next);
  }
}

export default accommodationValidator;
