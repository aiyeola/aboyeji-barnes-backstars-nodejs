/* eslint-disable */
import express from 'express';
import Rooms from '../../controllers/roomController';
import Accommodation from '../../controllers/accommodationController';
import Review from '../../controllers/reviewController';
import method from '../../utils/method';
import accommodationValidator from '../../validation/accommodationValidation';
import likeValidator from '../../validation/likeValidation';
import feedbackValidator from '../../validation/feedbackValidation';
import ratingValidator from '../../validation/ratingValidation';
import BookingValidation from '../../middlewares/validBooking';
import UserRoles from '../../middlewares/access';
import verify from '../../middlewares/auth';
const router = express();

router
  .route('/createroom')
  .post(
    verify,
    UserRoles.isTravelAdmin,
    accommodationValidator.validateRoomData,
    Accommodation.createRoom
  )
  .all(method);
router.route('/getrooms').get(verify, Rooms.getRooms).all(method);
router.route('/getallrooms').get(verify, Rooms.getAllRooms).all(method);
router
  .route('/')
  .get(Accommodation.getAccommodations)
  .post(
    verify,
    UserRoles.isTravelAdmin,
    BookingValidation.isAccommodationInLocation,
    accommodationValidator.validateAccommodation,
    Accommodation.createAccommodation
  )
  .all(method);
router.route('/:id').get(Accommodation.getAccommodationById).all(method);

router
  .route('/:id/ratings')
  .post(
    verify,
    UserRoles.isRequester,
    ratingValidator.validateRatingData,
    Accommodation.rateAccommodation
  )
  .all(method);

router
  .route('/:id/feedback')
  .post(
    verify,
    UserRoles.isRequester,
    feedbackValidator.validateFeedbackData,
    Review.addedFeedback
  )
  .get(Accommodation.getFeedback)
  .all(method);

router
  .route('/:id/like')
  .patch(
    verify,
    UserRoles.isRequester,
    likeValidator.validateLikeData,
    Accommodation.likeOrUnlike
  )
  .all(method);

router
  .route('/rooms/:id')
  .patch(
    verify,
    accommodationValidator.validateRoomData,
    Accommodation.updateRoom
  )
  .all(method);

export default router;
