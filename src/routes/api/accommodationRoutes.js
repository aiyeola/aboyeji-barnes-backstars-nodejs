/* eslint-disable */
import express from 'express';
import Room from '../../controllers/roomController';
import Accommodation from '../../controllers/accommodatonController';
import method from '../../utils/method';
import accommodationValidator from '../../validation/accommodationValidation';

const router = express();

router
  .route('/createroom')
  .post(accommodationValidator.validateRoomData, Accommodation.createRoom)
  .all(method);

router.route('/getallrooms').get(Room.getAllRooms).all(method);

export default router;
