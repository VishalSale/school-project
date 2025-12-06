const { body } = require('express-validator');

const blogValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean'),
];

module.exports = {
  blogValidator,
};
