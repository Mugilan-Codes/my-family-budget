import { check, validationResult, oneOf } from 'express-validator';
import { celebrate, Joi, errors } from 'celebrate';

// todo - find a way to make the run() work with oneOf()
const _validator = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// [
//       oneOf([
//         check('email', 'Enter a valid email').isEmail(),
//         check('username', 'Username must be valid').isLength({ min: 5 }),
//       ]),
//       check('password', 'Enter a valid password').isLength({ min: 6 }),
//     ],
const loginSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().min(5),
  password: Joi.string().required(),
}).xor('email', 'username');

// todo - Make use of the login method
const validate = (method) => {
  switch (method) {
    case 'register':
      return _validator([
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include email').isEmail(),
        check('password', 'Please include password').isLength({
          min: 6,
        }),
        check('username', 'Username must be atleast 5 characters')
          .isLength({ min: 5 })
          .optional({ checkFalsy: true }),
      ]);
    case 'login':
      return _cvalidator(loginSchema);
  }
};

export { validate, loginSchema };
