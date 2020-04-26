import { Router } from 'express';
import authRoutes from './authRoutes';
import accommodationRoutes from './accommodationRoutes';
import locationRoutes from './locationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodations', accommodationRoutes);
router.use('/locations', locationRoutes);

export default router;
