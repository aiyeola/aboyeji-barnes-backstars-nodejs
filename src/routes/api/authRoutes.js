/* eslint-disable no-unused-expressions */
import express from 'express';
import passport from 'passport';
import '../../config/passport';
import Users from '../../controllers/userController';
import userValidation from '../../validation/userValidation';
import method from '../../utils/method';
import verify from '../../middlewares/auth';
import Access from '../../middlewares/userRoles';

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router
  .route('/signup')
  .post(userValidation.validateSignup, Users.createUser)
  .all(method);

router
  .route('/signin')
  .post(userValidation.validateSignin, Users.login)
  .all(method);

router.route('/signout').post(verify, Users.logout).all(method);

router.route('/facebook').get(
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

router
  .route('/facebook/redirect')
  .get(passport.authenticate('facebook'), Users.socialLogin)
  .all(method);

router.route('/google').get(
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

router
  .route('/google/redirect')
  .get(passport.authenticate('google'), Users.socialLogin)
  .all(method);

router.route('/check-user').get(verify, Users.checkToken).all(method);

router
  .route('/create-link')
  .post(userValidation.validateSendLink, Users.sendLink)
  .all(method);

router
  .route('/verify')
  .patch(userValidation.validateVerifyLink, Users.verify)
  .all(method);

router.route('/forgot-password').post(Users.requestPasswordReset).all(method);

router
  .route('/reset-password/:userId/:token')
  .put(userValidation.resetPassword, Users.resetPassword)
  .all(method);

router
  .route('/update-role')
  .put(
    userValidation.validateUserRole,
    verify,
    Access.isAdmin,
    Users.updateUserRole
  )
  .all(method);

router
  .route('/add-user')
  .post(verify, userValidation.userByAdmin, Access.isAdmin, Users.addSupplier)
  .all(method);

router
  .route('/email-preferences')
  .patch(verify, Users.emailPreferences)
  .all(method);

router
  .route('/unsubscribe')
  .patch(userValidation.validateUnsubscribe, Users.unsubscribe)
  .all(method);

export default router;
