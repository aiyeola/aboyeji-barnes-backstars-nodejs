import { Router } from 'express';
import authRoutes from './authRoutes';
import bookingRoute from "./bookingRoute"
const router = Router();

router.use('/auth', authRoutes);
router.use("/booking",bookingRoute)
export default router;
