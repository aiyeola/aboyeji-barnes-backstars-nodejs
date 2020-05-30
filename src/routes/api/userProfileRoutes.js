import express from 'express';
import fileUpload from 'express-fileupload';
import UserProfile from '../../controllers/userProfileController';
import UserProfileValidation from '../../validation/userProfileValidation';
import verify from '../../middlewares/auth';

const router = express.Router();

router.use(fileUpload({ useTempFiles: true }));

router
  .route('/')
  .patch(verify, UserProfileValidation.checkUpdate, UserProfile.updateProfile);

router.route('/').get(verify, UserProfile.userProfile);

router.route('/picture').patch(verify, UserProfile.updatePicture);

router.route('/picture').get(verify, UserProfile.getPicture);

export default router;
