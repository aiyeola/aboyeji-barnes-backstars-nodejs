import express from 'express';
import RoomController from '../../controllers/roomController';
import verify from '../../middlewares/auth';
import method from '../../utils/method';

const router = express.Router();

router.route('/').get(verify, RoomController.getAllRooms).all(method);

export default router;
