import { validationResult } from 'express-validator';
import { CLIENT_URL } from '../../config';
import { HTTP_STATUS } from '../../constants/HTTPStatusCode';
import { RESPONSE_MESSAGE } from '../../constants/message';
import { authService } from '../services/auth';
import { UserService } from '../services/userService';
import { responseUtils } from '../utils/response';

export const authController = {
  async signUpWithEmailAndPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    } else {
      const { email, password, username } = req.body;
      const existingUser = await authService.getUserOfTypeEmail(email);
      if (existingUser) {
        return responseUtils.sendError(res, {
          status: HTTP_STATUS.NOT_ACCEPTED,
          message: RESPONSE_MESSAGE.SIGNUP_EMAIL_EXISTED,
        });
      }
      const sendUser = await authService.createUser({
        email,
        password,
        username,
      });
      responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.CREATED,
        data: sendUser,
      });
    }
  },

  googleAuthFailed: (req, res) => {
    responseUtils.sendError(res, { status: HTTP_STATUS.BAD_REQUEST });
  },

  googleLoginSuccess: (req, res) => {
    if (req.user) {
      return responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: req.user,
      });
    }
    return responseUtils.sendError(res, { status: HTTP_STATUS.BAD_REQUEST });
  },

  googleLogout: (req, res) => {
    try {
      req.logout((err) => {
        if (err) throw err;
      });
      res.redirect(CLIENT_URL);
    } catch (err) {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  guestLogin: async (req, res) => {
    const { username } = req.body;
    if (!username) {
      responseUtils.sendError(res, { status: HTTP_STATUS.BAD_REQUEST });
    }
    try {
      const user = await UserService.createGuestUser(username);

      return responseUtils.sendSuccess(res, {
        status: HTTP_STATUS.OK,
        data: user,
      });
    } catch (err) {
      return responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },

  loginWithEmail: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.getLoggedInUserOfTypeEmail({
        email,
        password,
      });
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: RESPONSE_MESSAGE.EMAIL_LOGIN_ERROR,
        });
      }
      responseUtils.sendSuccess(res, { status: HTTP_STATUS.OK, data: user });
    } catch {
      responseUtils.sendError(res, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }
  },
};
