import express from 'express';
const router = express.Router();

/**
 * @route   POST api/users
 * @desc    Register User
 * @access  Public
 */
router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Users Route');
});

export default router;
