import { Router } from 'express';

import imageController from '../controllers/imageController.js';

const router = Router();

router.get('/:title', imageController.getImageHandler);

export default router;
