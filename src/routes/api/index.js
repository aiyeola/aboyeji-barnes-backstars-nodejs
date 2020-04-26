import { Router } from 'express';
import authRoutes from './authRoutes';

import bookingRoute from "./bookingRoute"
const router = Router();

router.use('/auth', authRoutes);
router.use("/booking",bookingRoute)

import accommodationRoutes from './accommodationRoutes';
import locationRoutes from './locationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodation', accommodationRoutes);
router.use('/locations', locationRoutes);


export default router;
