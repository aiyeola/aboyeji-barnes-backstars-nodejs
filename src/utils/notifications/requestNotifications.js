/* eslint-disable class-methods-use-this */
import Emitter from '../eventEmitter';
import UserService from '../../services/userService';
import RequestService from '../../services/requestService';
import NotificationService from '../../services/notificationService';
import Email from '../mails/email';
import NotificationEmail from '../mails/requestNotification.email';
import app from '../chat/socket';

const { BASE_URL } = process.env;

/** event listeners that trigger notifications */
class Notifications {
  /**
   * function makes a notification object
   * @param {object} request - request object
   * @returns {object} notification object
   */
  async makeNotification(request) {
    const { userId } = request;
    const manager = await UserService.findUser({ userRoles: 'Manager' });
    const { id, firstName, lastName } = await UserService.findUser({
      id: userId
    });
    return {
      id: manager.id,
      userId: id,
      firstName,
      lastName,
      emailAllowed: manager.emailAllowed,
      userEmail: manager.userEmail,
      manager: manager.firstName
    };
  }

  /**
   * sends notification
   * @param {string} notification message
   * @param {integer} userId owner of notification
   * @param {string} type type of notification
   * @param {integer} requestId id of request
   * @return {function} create notifications
   */
  async notify(notification, userId, type, requestId) {
    const inAppNotification = await NotificationService.createNotification({
      notification,
      userId,
      type,
      requestId
    });
    // in app socket.io notification
    app.io.emit('created', inAppNotification);
  }

  /**
   * notification on request create event
   * @return {function} create notifications
   */
  async requestCreatedNotification() {
    await Emitter.on('request created', async (request) => {
      const {
        id,
        firstName,
        lastName,
        userEmail,
        emailAllowed,
        manager
      } = await this.makeNotification(request);
      const { id: requestId } = request;
      const notificationMessage = `${firstName} ${lastName} requested a new trip`;

      this.notify(notificationMessage, id, 'created', requestId);

      if (emailAllowed) {
        const unsubscribeUrl = Email.unsubscribeUrl({ userEmail });
        const requestUrl = `https://${BASE_URL}/api/v1/requests/${requestId}`;
        const header = Email.header({
          to: userEmail,
          subject: 'New travel request'
        });
        const msg = NotificationEmail.requestCreatedTemplate(
          requestUrl,
          manager,
          notificationMessage,
          unsubscribeUrl
        );
        await Email.sendMail({ header, msg });
      }
    });
  }

  /**
   * notification on request update event
   * @return {function} create notifications
   */
  async requestUpdated() {
    await Emitter.on('request update', async (request) => {
      const { status, id } = request;
      const { userId } = await this.makeNotification(request);
      if (status !== 'Pending') {
        const notificationMessage = `Your Request has been ${status.toLowerCase()}`;
        this.notify(notificationMessage, userId, 'updated', id);
      }
    });
  }

  /**
   * notification on request edit event
   * @return {function} notifications
   */
  async requestEdited() {
    await Emitter.on('request edited', async (request) => {
      const { userId, id: requestId } = request;
      const { id, firstName, lastName } = await this.makeNotification({
        userId
      });
      const notification = `${firstName} ${lastName} edited a travel request`;
      this.notify(notification, id, 'request edited', requestId);
    });
  }

  /**
   * notification on new comment event
   * @return {function} create notifications
   */
  async newComment() {
    await Emitter.on('new comment', async (comment) => {
      const { userId, requestId } = comment;
      const commentOwner = await UserService.findUser({ id: userId });
      const request = await RequestService.findRequest({ id: requestId });
      const requestOwner = await UserService.findUser({ id: request.userId });
      const manager = await UserService.findUser({ userRoles: 'Manager' });

      let sendTo;
      let notificationMessage;

      if (commentOwner.id !== requestOwner.id) {
        notificationMessage = 'The manager commented on your travel request';
        sendTo = requestOwner;
      } else {
        notificationMessage = `${requestOwner.firstName} ${requestOwner.lastName} commented on their travel request`;
        sendTo = manager;
      }

      this.notify(notificationMessage, sendTo.id, 'comment', requestId);

      if (sendTo.emailAllowed) {
        const requestUrl = `https://${BASE_URL}/api/v1/requests/${request.id}`;
        const unsubscribeUrl = Email.unsubscribeUrl({
          userEmail: sendTo.userEmail
        });
        const header = Email.header({
          to: sendTo.userEmail,
          subject: 'New travel request comment'
        });
        const msg = NotificationEmail.requestCreatedTemplate(
          requestUrl,
          sendTo.firstName,
          notificationMessage,
          unsubscribeUrl
        );
        await Email.sendMail({ header, msg });
      }
    });
  }

  /**
   * notification on new chat message event
   * @returns {object} chat
   */
  async newMessage() {
    await Emitter.on('chat created', async (chat) => chat);
  }
}

export default new Notifications();
