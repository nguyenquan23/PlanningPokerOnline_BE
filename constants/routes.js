import { SERVER_URL } from '../config';

export const ROUTES = {
  ROOT: {
    PATH: '/',
  },
  DOCS: {
    PATH: '/docs',
  },
  AUTH: {
    PATH: '/auth',
    GOOGLE_OAUTH: '/google',
    GOOGLE_CALLBACK: '/google/callback',
    GOOGLE_CALLBACK_FULLPATH: `${SERVER_URL}/auth/google/callback`,
    GOOGLE_CALLBACK_FAILED: '/google/failure',
    GOOGLE_LOGIN_SUCCESS: '/login/success',
    LOGOUT: '/logout',
    SIGNUP: '/signup',
    GUEST_LOGIN: '/guest/login',
    EMAIL_LOGIN: '/email/login',
  },
  USER: {
    PATH: '/user',
    GET_BY_ID: '/:id',
  },
  ROOM: {
    PATH: '/room',
    GET_ROOM: '/:id',
    NOMINATE: '/nominate',
    HISTORY: '/history/:id',
  },
  ISSUE: {
    PATH: '/issue',
    ROOT_PARAM_ID: '/:id',
    ROOM_ISSUE: '/room/:id',
  },
};
