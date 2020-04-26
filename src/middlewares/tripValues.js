import Response from '../utils/response';

// Work in progress
const isValidAccommodation = async (req, res, next) => {
  try {
    const valid = false;

    if (valid === false) {
      return Response.badRequestError(res, 'invalid Accomodation');
    }

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isValidAccommodation
};
