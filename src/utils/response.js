/** Class representing response util. */
class Response {
  /**
   * Returns a structured response
   * @param {object} res - response object.
   * @param {string} status - status code.
   * @param {string} message - response message.
   * @param {object} data - optional payload.
   * @returns {object} object.
   */
  static customResponse(res, status, message = null, data = null) {
    return res.status(status).json({
      status,
      message,
      data
    });
  }

  /**
   * Returns a validation error response.
   * @param {object} res - response object.
   * @param {string} message - response message.
   * @returns {object} object.
   */
  static validationError(res, message) {
    return res.status(422).json({
      status: 422,
      message,
      error: 'Validation Error'
    });
  }

  /**
   * Returns an authentication error response
   * @param {object} res - response object.
   * @param {string} message - response message.
   * @returns {object} object.
   */
  static authenticationError(res, message) {
    return res.status(401).json({
      status: 401,
      message,
      error: 'Authentication Error'
    });
  }

  /**
   * Returns an authorization error response
   * @param {object} res - response object.
   * @param {string} message - response message.
   * @returns {object} object.
   */
  static authorizationError(res, message) {
    return res.status(403).json({
      status: 403,
      message,
      error: 'Authorization Error'
    });
  }

  /**
   * Returns a not-found error response
   * @param {object} res - response object.
   * @param {string} message - response message.
   * @returns {object} object.
   */
  static notFoundError(res, message) {
    return res.status(404).json({
      status: 404,
      message,
      error: 'Not Found'
    });
  }

  /**
   * Returns a conflict error response
   * @param {object} res - response object.
   * @param {string} message - response message.
   * @returns {object} object.
   */
  static conflictError(res, message) {
    return res.status(409).json({
      status: 409,
      message,
      error: 'Conflict Error'
    });
  }

  /**
   * Returns a bad error response
   * @param {object} res - response object.
   * @param {string} message - response message.
   * @returns {object} object.
   */
  static badRequestError(res, message) {
    return res.status(400).json({
      status: 400,
      message,
      error: 'Bad Request'
    });
  }
}

export default Response;
