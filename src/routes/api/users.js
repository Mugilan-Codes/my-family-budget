import express from 'express';
import { celebrate } from 'celebrate';

import { registerUser } from '../../controllers/users';
import { registerSchema } from '../../utils/schema';

const router = express.Router();

router.post('/', celebrate({ body: registerSchema }), registerUser);

export default router;
