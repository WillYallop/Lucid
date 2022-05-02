import express from 'express';
const router = express.Router();
// Middleware
import checkDBConnection from '../../../middleware/check_db_connection';
import authMiddleware from '../../../middleware/auth';

import { uploadMedia, updateSingleMedia } from '../../../media';

router.post('/upload', checkDBConnection, authMiddleware, uploadMedia);
router.post('/update/:id', checkDBConnection, authMiddleware, updateSingleMedia);

export default router;