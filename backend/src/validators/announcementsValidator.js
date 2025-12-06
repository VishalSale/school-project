const { body } = require('express-validator');

const announcementValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title must not exceed 255 characters'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Event', 'Academic', 'Meeting', 'Holiday'])
    .withMessage('Invalid category'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('is_pinned')
    .optional()
    .isBoolean()
    .withMessage('is_pinned must be a boolean'),
];

module.exports = {
  announcementValidator,
};
