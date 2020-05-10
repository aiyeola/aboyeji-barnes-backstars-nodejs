/* eslint-disable no-useless-escape */
/* eslint-disable newline-per-chained-call */
/* eslint-disable implicit-arrow-linebreak */
import Joi from '@hapi/joi';

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
    .regex(/^[0-9]{11}/)
    .optional()
    .error(
      new Error(
        'phoneNumber field needs to have a 11 chars and they must all be numbers'
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
  stringOptional: Joi.string().trim().min(1).optional()
};
