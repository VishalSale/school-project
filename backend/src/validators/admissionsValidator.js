const { body } = require('express-validator');

const dateValidator = [
  body('label')
    .trim()
    .notEmpty()
    .withMessage('Label is required'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Invalid date format'),
];

const documentValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Document name is required'),
];

const applicationValidator = [
  body('student_name')
    .trim()
    .notEmpty()
    .withMessage('Student name is required'),
  body('student_dob')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('student_gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required'),
  body('class_applying')
    .trim()
    .notEmpty()
    .withMessage('Class applying for is required'),
  body('parent_name')
    .trim()
    .notEmpty()
    .withMessage('Parent name is required'),
  body('parent_email')
    .trim()
    .notEmpty()
    .withMessage('Parent email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('parent_phone')
    .trim()
    .notEmpty()
    .withMessage('Parent phone is required'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
];

module.exports = {
  dateValidator,
  documentValidator,
  applicationValidator,
};
