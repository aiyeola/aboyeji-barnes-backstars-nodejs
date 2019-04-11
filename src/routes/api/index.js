import { Router } from 'express';
import authRoutes from './authRoutes';
import accommodationRoutes from './accommodationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/accommodation', accommodationRoutes);

export default router;
