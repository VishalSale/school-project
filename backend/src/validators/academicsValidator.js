const { body } = require('express-validator');

const curriculumValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('subjects')
    .notEmpty()
    .withMessage('Subjects are required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('icon')
    .trim()
    .notEmpty()
    .withMessage('Icon is required'),
];

const classStructureValidator = [
  body('level')
    .trim()
    .notEmpty()
    .withMessage('Level is required'),
  body('grades')
    .trim()
    .notEmpty()
    .withMessage('Grades are required'),
  body('focus')
    .trim()
    .notEmpty()
    .withMessage('Focus is required'),
];

const programValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
];

module.exports = {
  curriculumValidator,
  classStructureValidator,
  programValidator,
};
