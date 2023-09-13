import express from 'express';
import siteController from '../controllers/site';
import { ROUTES } from '../../constants/routes';

const router = express.Router();

router.get(ROUTES.ROOT.PATH, siteController.loadServer);

export default router;
