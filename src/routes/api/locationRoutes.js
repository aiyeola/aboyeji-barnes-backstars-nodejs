import express from 'express';
import Location from '../../controllers/locationController';
import method from '../../utils/method';

const router = express.Router();

router
  .route('/locations')
  .get(Location.getLocations)
  .all(method);

router
  .route('/locations/:locationId')
  .get(Location.getLocationById)
  .all(method);

export default router;
