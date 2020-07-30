const { addAdminService } = require('../services/admins');

const registerAdmin = async (req, res, next) => {
  const { name, email, password, username } = req.body;

  try {
    const admin = await addAdminService({ name, email, password, username });

    if (admin.err_msg) {
      return res.status(409).json({ errors: [{ msg: admin.err_msg }] });
    }

    res.json({ admin });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export { registerAdmin };
