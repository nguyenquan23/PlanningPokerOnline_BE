import express from 'express';
import { ROUTES } from '../../constants/routes';
import { issueController } from '../controllers/issue';

/**
 * @swagger
 * tags:
 *   name: issue
 *   description: issue-related api
 */
const router = express.Router();

/**
 * @swagger
 * paths:
 *   '/issue':
 *     post:
 *       summary: 'Create issue'
 *       tags: [issue]
 *       requestBody:
 *         required: true
 *         content:
 *           'application/json':
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: vote
 *                 room:
 *                   type: string
 *                   example: 649d046a0a8c4e1c9c3aacfc
 *                 index:
 *                   type: integer
 *                   example: 0
 *       responses:
 *         200:
 *           description: 'return issue info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/Issue'
 */
router.post(ROUTES.ROOT.PATH, issueController.createIssue);

/**
 * @swagger
 * paths:
 *   '/issue/:id':
 *     get:
 *       summary: 'Get issue by id'
 *       tags: [issue]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: 'id attached in url when getting'
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 'return issue info in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     $ref: '#/components/schemas/Issue'
 */
router.get(ROUTES.ISSUE.ROOT_PARAM_ID, issueController.getById);

/**
 * @swagger
 * paths:
 *   '/issue/room/:id':
 *     get:
 *       summary: 'Get all issues in roomId'
 *       tags: [issue]
 *       parameters:
 *         - in: path
 *           name: room id
 *           required: true
 *           description: 'room id attached in url when getting'
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 'return list issue info in data (empty if not any created)'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Issue'
 */
router.get(ROUTES.ISSUE.ROOM_ISSUE, issueController.getIssuesByRoomId);

/**
 * @swagger
 * paths:
 *   '/issue/:id':
 *     delete:
 *       summary: 'Delete issue by id'
 *       tags: [issue]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: 'id attached in url when getting'
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: 'return message in data'
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   data:
 *                     type: object
 *                     properties:
 *                       messsage:
 *                         type: string
 *                         example: deleted
 */
router.delete(ROUTES.ISSUE.ROOT_PARAM_ID, issueController.deleteIssue);

export default router;
