import express from 'express';

import { registerUser } from '../../controllers/users';
import { validate } from '../../middleware/validator';

const router = express.Router();

router.post('/', validate('register'), registerUser);

export default router;
