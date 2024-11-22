import { Router } from 'express';

const router: Router = Router();
import multer from 'multer';

import * as controller from '../../controllers/client/user.controller';
import * as validate from '../../validates/register.validate';
import { validateEditProfile } from '../../validates/editProfile.validate';
import * as auth from '../../middlewares/client/authAccount.middleware';
import * as uploadCloud from '../../middlewares/client/uploadCloud.middleware';

const upload = multer();

router.get('/signin', controller.signin);
router.post('/signin', controller.signinPost);
router.get('/signup', controller.signup);
router.post(
  '/signup',
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.registerValidate,
  controller.signupPost
);
router.get('/logout', controller.logout);
router.get('/forgot-password', controller.forgotPassword);
router.post('/forgot-password', controller.forgotPasswordPost);
router.get('/forgot-password/otp', controller.otpPassword);
router.post('/forgot-password/otp', controller.otpPasswordPost);
router.get('/password/reset', auth.setUserInfo, controller.resetPassword);
router.patch(
  '/password/reset',
  auth.setUserInfo,
  validate.validatePassword,
  controller.resetPasswordPatch
);

router.get('/profile', auth.setUserInfo, controller.profile);

router.patch(
  '/profile/edit',
  auth.setUserInfo,
  upload.single('thumbnail'),
  validateEditProfile,
  uploadCloud.uploadSingle,
  controller.profileEdit
);

export const userRoutes: Router = router;
