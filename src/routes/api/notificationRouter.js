import express from 'express';
import Notification from '../../controllers/notificationController';
import verify from '../../middlewares/auth';
import Access from '../../middlewares/userRoles';
import Validator from '../../validation/notificationValidation';

const router = express.Router();

router.get('/', verify, Notification.getNotifications);

router.patch(
  '/mark-as-read',
  verify,
  Validator.markAsRead,
  Access.isNotificationOwner,
  Notification.markAsRead
);

export default router;
