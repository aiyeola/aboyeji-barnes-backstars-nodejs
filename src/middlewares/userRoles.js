import Response from '../utils/response';
import RequestService from '../services/requestService';
import NotificationService from '../services/notificationService';

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
        "You don't have access rights to complete this operation"
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

  /**
   * Checks if user is a requester
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isRequester(req, res, next) {
    if (req.user.userRoles !== 'Requester') {
      return Response.authorizationError(
        res,
        "You don't have access rights to complete this operation"
      );
    }
    next();
  }

  /**
   * Checks if user is a manager
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static managerRole(req, res, next) {
    if (req.user.userRoles !== 'Manager') {
      return Response.authorizationError(
        res,
        'You are not allowed to perform this task'
      );
    }
    next();
  }

  /**
   * Checks if user is the request owner or manager
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isOwnerOrManager(req, res, next) {
    const request = await RequestService.findRequests({ id: req.params.id });
    if (!request) {
      return Response.notFoundError(res, 'Request not found');
    }
    if (req.user.userRoles !== 'Manager' && req.params.id !== request.user) {
      return Response.authorizationError(
        res,
        "You don't have the rights to complete this operation"
      );
    }
    next();
  }

  /**
   * Checks if the user is the owner.
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isOwner(req, res, next) {
    const { id } = req.params;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) {
      return Response.badRequestError(res, 'Enter a valid request');
    }
    const data = await RequestService.findRequest({ id });
    if (data === null) {
      return Response.notFoundError(res, 'Enter a valid request');
    }
    const { userId, status } = data.dataValues;
    if (userId !== req.user.id) {
      return Response.authorizationError(
        res,
        "You don't have rights to edit this request"
      );
    }
    if (status !== 'Pending') {
      return Response.authorizationError(
        res,
        "You can't edit/delete a request that has either been rejected or Approved"
      );
    }
    next();
  }

  /**
   * Checks if the user is the notification owner or manager.
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isNotificationOwner(req, res, next) {
    const {
      query: { id },
      user: { id: userId }
    } = req;
    if (id) {
      const data = await NotificationService.getNotifications({
        id
      });
      if (data.notifications.length === 0) {
        return Response.notFoundError(
          res,
          'Please use a valid notification ID'
        );
      }
      if (userId !== data.notifications[0].dataValues.userId) {
        return Response.authorizationError(
          res,
          "You can't mark this notification as read"
        );
      }
    }
    next();
  }
}

export default Access;
