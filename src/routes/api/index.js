import { Router } from 'express';
import authRoutes from './authRoutes';
import accommodationRoutes from './accommodationRoutes';
import locationRoutes from './locationRoutes';
import profileRoutes from './userProfileRoutes';
import bookingRoute from './bookingRoute';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodation', accommodationRoutes);
router.use('/locations', locationRoutes);
router.use('/profile', profileRoutes);
router.use('/booking', bookingRoute);

export default router;
