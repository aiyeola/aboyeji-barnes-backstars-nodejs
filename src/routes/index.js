import swagger from 'swagger-ui-express';
import express from 'express';
import swaggerDoc from '../docs';
import index from './api';

const router = express.Router();

router.use('/api/v1/', index);

router.use('/api/docs', swagger.serve, swagger.setup(swaggerDoc));

export default router;
