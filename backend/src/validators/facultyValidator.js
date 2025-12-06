const { body } = require('express-validator');

const facultyValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 255 })
    .withMessage('Name must not exceed 255 characters'),
  body('position')
    .trim()
    .notEmpty()
    .withMessage('Position is required'),
  body('qualification')
    .trim()
    .notEmpty()
    .withMessage('Qualification is required'),
  body('experience')
    .trim()
    .notEmpty()
    .withMessage('Experience is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
];

module.exports = {
  facultyValidator,
};
