import Response from '../utils/response';

/** Class representing validation of trip values */
class TripValues {
  /**
   * Checks if accommodation  is valid
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isValidAccommodation(req, res, next) {
    // What is used to determine this?
    try {
      const valid = true;

      if (valid === false) {
        return Response.badRequestError(res, 'invalid Accommodation');
      }
      next();
    } catch (error) {
      return next(error);
    }
  }
}

export default TripValues;
