const { body, validationResult } = require('express-validator');

const fieldValidation = [
  body('firstName').notEmpty().withMessage("First name must be entered."),
  body('lastName').notEmpty().withMessage("Last name must be entered."),
  body('email').notEmpty().withMessage("Email must be entered.").isEmail().withMessage("Must be a valid email address."),
  body('password').notEmpty().withMessage("Password must be entered").trim().escape().isLength({ min: 8 }).withMessage("Password length must be 8 or more characters.")
];

const signupValidation = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  next();
};

module.exports = {
  fieldValidation,
  signupValidation,
};








