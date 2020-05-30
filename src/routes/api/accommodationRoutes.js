import express from 'express';
import Accommodation from '../../controllers/accommodationController';
import Review from '../../controllers/reviewController';
import method from '../../utils/method';
import accommodationValidation from '../../validation/accommodationValidation';
import feedbackValidation from '../../validation/feedbackValidation';
import ratingValidation from '../../validation/ratingValidation';
import Access from '../../middlewares/userRoles';
import verify from '../../middlewares/auth';

const router = express();

router
  .route('/')
  .get(verify, Accommodation.getAccommodations)
  .post(
    verify,
    Access.isAllowedUser,
    accommodationValidation.validateAccommodation,
    Accommodation.createAccommodation
  )
  .all(method);

router
  .route('/rooms')
  .post(
    verify,
    Access.isAllowedUser,
    accommodationValidation.validateRoomData,
    Accommodation.createRoom
  )
  .all(method);

router
  .route('/most-travelled-destination')
  .get(verify, Accommodation.getMostTravelledDestination);

router
  .route('/:id')
  .get(
    verify,
    accommodationValidation.validateGetOneAccommodation,
    Accommodation.getAccommodationById
  )
  .all(method);

router
  .route('/:id/like')
  .patch(
    verify,
    accommodationValidation.validateGetOneAccommodation,
    Accommodation.likeOrUnlike
  )
  .all(method);

router
  .route('/:id/feedback')
  .post(verify, feedbackValidation.validateFeedbackData, Review.addedFeedback)
  .all(method);

router
  .route('/:id/ratings')
  .post(verify, ratingValidation.validateRatingData, Review.rateCenter)
  .all(method);

export default router;
