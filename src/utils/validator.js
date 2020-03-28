import Response from './response';
import '@hapi/joi';

export default (schema, toValidate, res) => {
  const data = schema.validate(toValidate);

  if (data.error) {
    Response.validationError(res, data.error.message);
  } else {
    return data;
  }
  // next();
};
