import Response from '../utils/response';

/** Class representing a user role */
class Access {
  /**
   * Checks if user is an admin
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isAdmin(req, res, next) {
    if (req.user.userRoles !== 'Super Administrator') {
      return Response.authorizationError(
        res,
        "You don't have rights to complete this operation"
      );
    }
    next();
  }

  /**
   * Checks if user is allowed
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isAllowedUser(req, res, next) {
    const { userRoles } = req.user;
    const allowedUsers = ['Travel Administrator', 'Accommodation Supplier'];
    if (allowedUsers.includes(userRoles) === false) {
      return Response.authorizationError(
        res,
        'You are not allowed to perform this task'
      );
    }
    next();
  }
}

export default Access;
