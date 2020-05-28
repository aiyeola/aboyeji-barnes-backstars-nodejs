import { Router } from 'express';
import authRoutes from './authRoutes';
import accommodationRoutes from './accommodationRoutes';
import locationRoutes from './locationRoutes';
import profileRoutes from './userProfileRoutes';
import bookingRoute from './bookingRoute';
import requestRoute from './requestRoute';
import roomRoute from './roomRoute';
import searchRouter from './searchRoute';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/locations', locationRoutes);
router.use('/profile', profileRoutes);
router.use('/booking', bookingRoute);
router.use('/requests', requestRoute);
router.use('/rooms', roomRoute);
router.use('/search', searchRouter);

export default router;
