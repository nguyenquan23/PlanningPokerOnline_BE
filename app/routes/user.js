import express from 'express';
import { ROUTES } from '../../constants/routes';
import { userController } from '../controllers/user';

/**
 * @swagger
 * tags:
 *   name: user
 *   description: user-related api
 */
const router = express.Router();

/**
 * @swagger
 * paths:
 *   '/user/:id':
 *     get:
 *       summary: 'Get user by id'
 *       tags: [user]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: 'id attached in url when getting'
 *           schema:
 *             type: string
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
router.get(ROUTES.USER.GET_BY_ID, userController.getUserById);

/**
 * @swagger
 * paths:
 *   '/user':
 *     patch:
 *       summary: 'Update user profile'
 *       tags: [user]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 649d26b9d32d0a9ce5acfc14
 *                 displayName:
 *                   type: string
 *                   example: new name
 *                 photoURL:
 *                   type: string
 *                   example: https://lh3.googleusercontent.com/a/AAcHTtfwJBg-74rzF_zGukz9ClatKMpJMBlWD04lGBHmXNq_=s96-c
 *       responses:
 *         200:
 *           description: 'return updated user info in data'
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
router.patch(ROUTES.ROOT.PATH, userController.updateProfile);

export default router;
