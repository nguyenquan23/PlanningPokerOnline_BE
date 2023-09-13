import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDefinition } from '../services/3rd_party/swaggerDefinition';
import { ROUTES } from '../../constants/routes';

const router = express.Router();

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./app/routes/*.js', './app/models/*.js'],
});

router.use(ROUTES.ROOT.PATH, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;
