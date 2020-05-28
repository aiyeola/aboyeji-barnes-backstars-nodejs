/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const destination = Joi.object().keys({
  travelDate: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .error(
      new Error('Enter date of travel in yyyy-mm-dd format at least today')
    ),
  accommodation: Joi.string()
    .trim()
    .required()
    .error(new Error('Enter a place of accommodation')),
  location: Joi.number()
    .integer()
    .required()
    .error(new Error('Enter id of destination'))
});

export default {
  from: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
    .required()
    .min(2)
    .error(
      new Error('Enter place of departure, "from" in City, Country format')
    ),
  to: Joi.array()
    .items(destination)
    .required()
    .error(new Error('Enter destination details')),
  reason: Joi.string()
    .trim()
    .required()
    .min(30)
    .error(new Error('Enter a description not less than 30 characters'))
};
