import express from 'express';
import BookingController from '../../controllers/bookingController';
import BookingValidator from '../../validation/bookingValidation';
import verify from '../../middlewares/auth';
import Valid from '../../middlewares/validBooking';
import method from '../../utils/method';

const router = express.Router();

router
  .route('/:id')
  .post(
    verify,
    BookingValidator.booking,
    Valid.isRequestValid,
    Valid.isAccommodationInLocation,
    Valid.isValidRoom,
    Valid.validCheckInOut,
    Valid.isRoomFree,
    BookingController.bookRooms
  )
  .all(method);

router
  .route('/cancel/:id')
  .post(verify, BookingValidator.cancel, BookingController.cancelBooking)
  .all(method);

export default router;
