import { Router } from 'express';
import authRoutes from './authRoutes';

import bookingRoute from "./bookingRoute"
const router = Router();

router.use('/auth', authRoutes);
router.use("/booking",bookingRoute)

import accommodationRoutes from './accommodationRoutes';
import locationRoutes from './locationRoutes';
import profileRoutes from './userProfileRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodation', accommodationRoutes);
router.use('/locations', locationRoutes);
router.use('/profile', profileRoutes);


export default router;
