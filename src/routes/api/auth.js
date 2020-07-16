import express from 'express';

import { auth } from '../../middleware/auth';
import { getUser } from '../../controllers/users';

const router = express.Router();

router.get('/', auth, getUser);

export default router;
