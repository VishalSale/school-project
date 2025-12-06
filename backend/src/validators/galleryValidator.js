const { body } = require('express-validator');

const galleryValidator = [
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['events', 'sports', 'academics', 'infrastructure'])
    .withMessage('Invalid category'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),
  body('url')
    .trim()
    .notEmpty()
    .withMessage('Image URL is required'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
];

module.exports = {
  galleryValidator,
};
