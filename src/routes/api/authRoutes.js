/* eslint-disable no-unused-expressions */
import express from 'express';
import Users from '../../controllers/userController';
import userValidation from '../../validation/userValidation';
import method from '../../utils/method';

const router = express.Router();

router
  .route('/signup')
  .post(userValidation.validateSignup, Users.createUser)
  .all(method);

export default router;
