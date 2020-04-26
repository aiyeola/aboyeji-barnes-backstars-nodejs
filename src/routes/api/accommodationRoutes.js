/* eslint-disable */
import express from 'express';
import Room from '../../controllers/roomController';
import Accommodation from '../../controllers/accommodationController';
import Review from '../../controllers/reviewController';
import method from '../../utils/method';
import accommodationValidator from '../../validation/accommodationValidation';
import likeValidator from '../../validation/likeValidation';
import feedbackValidator from '../../validation/feedbackValidation';
import ratingValidator from '../../validation/ratingValidation';
const router = express();

router
  .route('/createroom')
  .post(accommodationValidator.validateRoomData, Accommodation.createRoom)
  .all(method);

router
  .route('/')
  .get(Accommodation.getAccommodations)
  .post(
    accommodationValidator.validateAccommodation,
    Accommodation.createAccommodation
  )
  .all(method);
router.route('/:id').get(Accommodation.getAccommodationById).all(method);

router
  .route('/:id/ratings')
  .post(ratingValidator.validateRatingData, Accommodation.rateAccommodation)
  .all(method);

router
  .route('/:id/feedback')
  .post(feedbackValidator.validateFeedbackData, Review.addedFeedback)
  .get(Accommodation.getFeedback)
  .all(method);

router
  .route('/:id/like')
  .patch(likeValidator.validateLikeData, Accommodation.likeOrUnlike)
  .all(method);

router
  .route('/rooms/:id')
  .patch(accommodationValidator.validateRoomData, Accommodation.updateRoom)
  .all(method);

router.route('/getallrooms').get(Room.getAllRooms).all(method);

export default router;
