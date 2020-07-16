import express from 'express';

import { auth } from '../../middleware/auth';
import { getUser, loginUser } from '../../controllers/users';

const router = express.Router();

router.get('/', auth, getUser).post('/', loginUser);

export default router;
