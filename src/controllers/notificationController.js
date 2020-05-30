import NotificationService from '../services/notificationService';
import Response from '../utils/response';

/** Class handling notifications */
class Notifications {
  /**
   * user can get all notifications
   * @param {object} req -request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getNotifications(req, res, next) {
    const { id: userId } = req.user;
    try {
      const data = await NotificationService.getNotifications({
        userId
      });
      return Response.customResponse(
        res,
        200,
        'Your Notifications have been retrieved successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * user can mark notification as read
   * @param {object} req -request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async markAsRead(req, res, next) {
    const {
      query: { id },
      user: { id: userId }
    } = req;
    try {
      const param = id ? { id } : { userId };
      const data = await NotificationService.markAsRead({
        ...param,
        ...{ read: false }
      });
      let message = data > 1 ? 'Notifications' : 'Notification';
      message += ' successfully marked as read';
      if (data[0] === 0) message = 'No Notifications marked as read';
      return Response.customResponse(
        res,
        200,
        message,
        `${data} marked as read`
      );
    } catch (error) {
      return next(error);
    }
  }
}
export default Notifications;
