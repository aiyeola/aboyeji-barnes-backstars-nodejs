import { Router } from 'express';
import authRoutes from './authRoutes';
import accommodationRoutes from './accommodationRoutes';
import locationRoutes from './locationRoutes';
import profileRoutes from './userProfileRoutes';
import bookingRoute from './bookingRoute';
import requestRoute from './requestRoute';
import roomRoute from './roomRoute';
import searchRouter from './searchRoute';
import notificationRouter from './notificationRouter';
import chatRouter from './chatRouter';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/locations', locationRoutes);
router.use('/profile', profileRoutes);
router.use('/booking', bookingRoute);
router.use('/requests', requestRoute);
router.use('/rooms', roomRoute);
router.use('/search', searchRouter);
router.use('/notifications', notificationRouter);
router.use('/chat', chatRouter);

router.use((err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({
      status: 400,
      errors: "Server can't handle the request currently"
    });
  }

  return next(err);
});

export default router;
