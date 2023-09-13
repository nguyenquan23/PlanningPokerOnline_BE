import express from 'express';
import { body } from 'express-validator';
import passport from 'passport';
import PopupTools from 'popup-tools';
import { ROUTES } from '../../constants/routes';
import { authController } from '../controllers/auth';
import '../services/3rd_party/passport';

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: auth-related api
 */
const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

/**
 * @swagger
 * paths:
 *   '/auth/google':
 *     get:
 *       summary: 'Redirect to google oauth page'
 *       tags: [auth]
 */
router.get(
  ROUTES.AUTH.GOOGLE_OAUTH,
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account',
  })
);

router.get(
  ROUTES.AUTH.GOOGLE_CALLBACK,
  passport.authenticate('google', {
    session: false,
  }),
  (req, res) => {
    res.end(PopupTools.popupResponse(req.user));
  }
);

router.get(ROUTES.AUTH.GOOGLE_CALLBACK_FAILED, authController.googleAuthFailed);

/**
 * @swagger
 * paths:
 *   '/auth/logout':
 *     get:
 *       summary: 'Delete user in request and redirect to client again'
 *       tags: [auth]
 */
router.use(ROUTES.AUTH.LOGOUT, authController.googleLogout);

/**
 * @swagger
 * paths:
 *   '/auth/guest/login':
 *     post:
 *       summary: 'Login as guest'
 *       tags: [auth]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *       responses:
 *         200:
 *           description: 'return user info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/User'
 */
router.post(ROUTES.AUTH.GUEST_LOGIN, authController.guestLogin);

/**
 * @swagger
 * paths:
 *   '/auth/signup':
 *     post:
 *       summary: 'Register using email and password'
 *       tags: [auth]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: 'return user info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/User'
 */
router.post(
  ROUTES.AUTH.SIGNUP,
  body('email').trim().isEmail(),
  body('password').isLength({ min: 6 }),
  authController.signUpWithEmailAndPassword
);

/**
 * @swagger
 * paths:
 *   '/auth/email/login':
 *     post:
 *       summary: 'Login using email and password'
 *       tags: [auth]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: 'return user info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/User'
 */
router.post(ROUTES.AUTH.EMAIL_LOGIN, authController.loginWithEmail);

export default router;
