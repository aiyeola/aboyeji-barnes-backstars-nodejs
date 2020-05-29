import { newMessage, addOnline } from '../chat';
import requestNotification from './requestNotifications';

module.exports = () => {
  newMessage();
  addOnline();
  requestNotification.requestCreatedNotification();
  requestNotification.requestUpdated();
  requestNotification.requestEdited();
  requestNotification.newComment();
};
