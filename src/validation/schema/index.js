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
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  number: Joi.number()
    .min(1)
    .required(),
  nameOptional: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
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
    )
};
