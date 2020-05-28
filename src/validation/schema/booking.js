/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const details = Joi.object().keys({
  checkIn: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .error(new Error('Enter date of check in in yyyy-mm-dd format')),
  checkOut: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .error(new Error('Enter date of check out in yyyy-mm-dd format')),
  accommodation: Joi.string()
    .trim()
    .optional()
    .error(new Error('Enter a place of accommodation')),
  room: Joi.number().integer().required().error(new Error('Enter room id'))
});

export default {
  booking: Joi.array()
    .items(details)
    .required()
    .error(new Error('Enter booking details'))
};
