/* eslint-disable */
import express from 'express';
import Rooms from '../../controllers/roomController';
import Accommodation from '../../controllers/accommodationController';
import Review from '../../controllers/reviewController';
import method from '../../utils/method';
import accommodationValidation from '../../validation/accommodationValidation';
import likeValidation from '../../validation/likeValidation';
import feedbackValidation from '../../validation/feedbackValidation';
import ratingValidation from '../../validation/ratingValidation';
import validateBooking from '../../middlewares/validBooking';
import Access from '../../middlewares/userRoles';
import verify from '../../middlewares/auth';
const router = express();

router
  .route('/createroom')
  .post(
    verify,
    Access.isAllowedUser,
    accommodationValidation.validateRoomData,
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
    Access.isAllowedUser,
    validateBooking.isAccommodationInLocation,
    accommodationValidation.validateAccommodation,
    Accommodation.createAccommodation
  )
  .all(method);
router.route('/:id').get(Accommodation.getAccommodationById).all(method);

router
  .route('/:id/ratings')
  .post(
    verify,
    // Access.isRequester,
    ratingValidation.validateRatingData,
    Accommodation.rateAccommodation
  )
  .all(method);

router
  .route('/:id/feedback')
  .post(
    verify,
    feedbackValidation.validateFeedbackData,
    // Access.isRequester,
    Review.addedFeedback
  )
  .get(Accommodation.getFeedback)
  .all(method);

router
  .route('/:id/like')
  .patch(
    verify,
    likeValidation.validateLikeData,
    // Access.isRequester,
    Accommodation.likeOrUnlike
  )
  .all(method);

router
  .route('/rooms/:id')
  .patch(
    verify,
    accommodationValidation.validateRoomData,
    Accommodation.updateRoom
  )
  .all(method);

export default router;
