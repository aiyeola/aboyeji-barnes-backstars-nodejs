/* eslint-disable no-unused-expressions */
import express from 'express';
import Users from '../../controllers/userController';
import userValidation from '../../validation/userValidation';
import method from '../../utils/method';
import verify from '../../middlewares/auth';

const router = express.Router();

router
  .route('/signup')
  .post(userValidation.validateSignup, Users.createUser)
  .all(method);

router
  .route('/signin')
  .post(userValidation.validateSignin, Users.login)
  .all(method);

router.route('/signout').post(verify, Users.logout);
export default router;
