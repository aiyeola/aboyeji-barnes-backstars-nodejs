/* eslint-disable no-useless-escape */
/* eslint-disable newline-per-chained-call */
/* eslint-disable implicit-arrow-linebreak */
import Joi from '@hapi/joi';

const details = Joi.object().keys({
  travelDate: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .optional()
    .error(
      new Error('Enter date of travel in yyyy-mm-dd format at least today')
    ),
  accommodation: Joi.string()
    .trim()
    .optional()
    .error(new Error('Enter a Place of accommodation')),
  location: Joi.number()
    .integer()
    .optional()
    .error(new Error('Enter id of destination'))
});

const room = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30).required(),
  type: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(1).required()
});

export default {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true }
    })
    .trim()
    .required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  text: Joi.string().required(),
  status: Joi.string().valid('Available', 'Unavailable').required(),
  number: Joi.number().min(1).required(),
  nameOptional: Joi.string().alphanum().min(3).max(30).optional(),
  url: Joi.string().uri().required(),
  array: Joi.array().required(),
  boolean: Joi.boolean().required(),
  json: Joi.object().required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/
    )
    .trim()
    .required()
    .min(1)
    .error(
      new Error(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)'
      )
    ),
  date: Joi.date().required(),
  link: Joi.string()
    .required()
    .error(new Error('token is required and must be a string')),
  role: Joi.string()
    .valid('Travel Team Member', 'Travel Administrator', 'Manager', 'Requester')
    .required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
  department: Joi.string()
    .trim()
    .optional()
    .valid('Marketing', 'Operations', 'Finance'),
  phone: Joi.string()
    .regex(/^[0-9]{10}/)
    .optional()
    .error(
      new Error(
        'phoneNumber field needs to have a 10 chars and they must all be numbers'
      )
    ),
  birthDate: Joi.date()
    .optional()
    .max('01-01-2002')
    .error(
      new Error(
        'Format of birth date needs to be  dd-mm-yyyy and Needs to be before 01-01-2002'
      )
    ),
  passportName: Joi.string()
    .min(1)
    .trim()
    .error(new Error('Passport name must be string and at least 2 chars long')),
  passportNumber: Joi.string()
    .min(1)
    .trim()
    .error(
      new Error('Passport Number must be a string and at least 4 chars long')
    ),
  string: Joi.string().trim().min(1).required(),
  stringOptional: Joi.string().trim().min(1).optional(),
  stringLong: Joi.string().trim().required().min(30),
  stringLongOptional: Joi.string().trim().optional().min(30),
  id: Joi.number().integer().min(1).required(),
  idOptional: Joi.number().integer().min(1).optional(),
  to: Joi.array()
    .items(details)
    .error(new Error('Enter correct destination details')),
  from: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
    .optional()
    .min(2)
    .error(
      new Error('Enter place of departure, "from" in City, Country format')
    ),
  minDate: Joi.date()
    .min('now')
    .error(
      new Error(
        'Enter date of return in yyyy-mm-dd format greater than date of travel'
      )
    ),
  listArray: Joi.array()
    .items(Joi.string().trim())
    .single()
    .error(new Error('pass in an array of amenities, must be strings')),
  listArray2: Joi.array()
    .items(Joi.string().trim())
    .single()
    .error(new Error('pass in an array of services, must be strings')),
  rooms: Joi.array()
    .items(room)
    .required()
    .error(new Error('Enter correct room details')),
  rating: Joi.number()
    .integer()
    .required()
    .min(1)
    .max(5)
    .error(new Error('rating must be number between 1 and 5'))
};
