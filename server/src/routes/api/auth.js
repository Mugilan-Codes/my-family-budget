import express from 'express';

import { celebrate } from 'celebrate';
import { loginSchema } from '../../utils/schema';
import { loginUserController } from '../../controllers/users';

const router = express.Router();

router.post('/', celebrate({ body: loginSchema }, loginUserController));

export default router;
