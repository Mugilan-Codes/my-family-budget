import { check, validationResult } from 'express-validator';

const _validator = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

const validate = (method) => {
  switch (method) {
    case 'register': {
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
    }
  }
};

export { validate };
