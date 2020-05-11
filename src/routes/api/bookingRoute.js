const express = require('express');
import BookingController from '../../controllers/bookingController';
import bookingValidator from '../../validation/bookValidation';
import method from '../../utils/method';

const router = express.Router();
router.route('/').get(BookingController.getAllBookings).all(method);

router
  .route('/createbooking')
  .post(bookingValidator.bookingVal, BookingController.createBooking)
  .all(method);

router.route('/:id').get(BookingController.findBooking).all(method);

router.route('/update/:id').patch(BookingController.updateBooking).all(method);
router.route('/delete/:id').delete(BookingController.deleteBooking).all(method);
export default router;
