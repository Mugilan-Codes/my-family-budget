import express from 'express';

import { auth } from '../../middleware/auth';
import { addEntryController } from '../../controllers/entries';

const router = express.Router();

router.post('/', auth, addEntryController);

export default router;
