/* eslint-disable */
import express from 'express';
import Room from '../../controllers/roomController';
import Accommodation from '../../controllers/accommodationController';
import method from '../../utils/method';
import accommodationValidator from '../../validation/accommodationValidation';
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

router.route('/:id/ratings').post(Accommodation.rateAccommodation).all(method);

router.route('/:id/feedback').get(Accommodation.getFeedback).all(method);

router.route('/:id/like').patch(Accommodation.likeOrUnlike).all(method);

router
  .route('/rooms/:id')
  .patch(accommodationValidator.validateRoomData, Accommodation.updateRoom)
  .all(method);

router.route('/getallrooms').get(Room.getAllRooms).all(method);

export default router;
