import express from 'express';
const router = express.Router();
// Middleware
import checkDBConnection from '../middleware/check_db_connection';
import authMiddleware from '../middleware/auth';

import { uploadMedia, updateSingleMedia } from './index';

router.post('/upload', checkDBConnection, uploadMedia);
router.post('/update/:id', checkDBConnection, updateSingleMedia);

export default router;