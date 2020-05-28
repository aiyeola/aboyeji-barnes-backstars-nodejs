import Response from '../utils/response';

/** Validates Search params */
class SearchValidator {
  /**
   *  validate search request parameters
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} validation response
   */
  static checkRequestParams(req, res, next) {
    const allowed = [
      'id',
      'requester',
      'travelDate',
      'from',
      'returnDate',
      'reason',
      'status',
      'userId',
      'accommodation',
      'destination'
    ];
    const fields = req.query;

    const fieldKeys = Object.keys(fields);

    const result = fieldKeys.some((el) => allowed.indexOf(el) === -1);

    if (result) {
      return Response.validationError(res, 'Invalid query parameters passed');
    }

    next();
  }
}

export default SearchValidator;
