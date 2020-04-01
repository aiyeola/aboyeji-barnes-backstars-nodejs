import Response from './response';
import '@hapi/joi';

export default async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return Response.validationError(res, error.message);
  }
};
