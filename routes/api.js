import { Router } from 'express';

import apiController from '../controllers/apiController.js';

const router = Router();

router.get('/', (req, res) => res.status(301).redirect('/api/people'));

router.get('/people', apiController.getMainPage);

export default router;
