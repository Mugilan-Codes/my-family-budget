import express from 'express';

import { registerAdmin } from '../../controllers/admins';

const router = express.Router();

router.post('/', registerAdmin);

export default router;
