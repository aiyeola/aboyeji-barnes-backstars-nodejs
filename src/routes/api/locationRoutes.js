import express from 'express';
import Location from '../../controllers/locationController';
import method from '../../utils/method';

const router = express.Router();

router.route('/').get(Location.getLocations).all(method);

export default router;
