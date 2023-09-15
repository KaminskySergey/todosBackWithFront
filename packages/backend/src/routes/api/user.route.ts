import { Router } from 'express';

import userController from '../../controllers/user.controller';
import { userSchema } from '../../validator/schema.validators';
import validator from '../../validator/validator';
import { VerifyMiddlware } from '../../middlewares/auth.middleware';
import { catchAsync } from '../../middlewares/middlewares';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  '/register',
  validator.isBody(userSchema.userSchemaRegister),
  catchAsync(userController.register.bind(userController))
);

router.post(
  '/login',
  validator.isBody(userSchema.login),
  userController.login.bind(userController)
);

router.get(
  '/activate/:link',
  VerifyMiddlware({ allow: true }),
  userController.activate.bind(userController)
);

router.get(
  '/info',
  VerifyMiddlware({ allow: false }),
  userController.activate.bind(userController)
);

router.post(
  '/reset',
  validator.isBody(userSchema.reset),
  catchAsync(userController.reset.bind(userController))
);
router.put(
  '/reset-password/:token',
  validator.isBody(userSchema.resetPasword),
  VerifyMiddlware({ allow: false }),
  userController.resetPassword.bind(userController)
);

router.post(
  '/forgot',
  VerifyMiddlware({ allow: true }),
  validator.isBody(userSchema.reset),
  catchAsync(userController.recoverReset.bind(userController))
);
router.post(
  '/forgot/:token',
  validator.isBody(userSchema.recoverPassword),
  VerifyMiddlware({ allow: true }),
  userController.recoverNewPassword.bind(userController)
);
export default router;
