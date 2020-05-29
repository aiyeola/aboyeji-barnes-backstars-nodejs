import database from '../database/models';

const { Notifications } = database;

/** Class representing Notification Service  */
class NotificationService {
  /**
   * Creates a new notification.
   * @param {object} notification notification
   * @returns {object} The notification object.
   */
  static async createNotification(notification) {
    const results = await Notifications.create(notification);
    return results;
  }

  /**
   * Gets all notifications.
   * @param {object} param to find notification by
   * @returns {object} The notification object.
   */
  static async getNotifications(param) {
    const results = await Notifications.findAll({
      where: param,
      order: [
        ['read', 'ASC'],
        ['createdAt', 'DESC']
      ]
    });
    const unread = await Notifications.count({
      where: {
        ...param,
        read: false
      }
    });
    return {
      unread,
      notifications: results
    };
  }

  /**
   * Marks notification as read
   * @param {object} param to find notification by
   * @returns {object} The notification object.
   */
  static async markAsRead(param) {
    const deleted = await Notifications.update(
      { read: true },
      {
        where: param
      }
    );
    return deleted;
  }
}

export default NotificationService;
