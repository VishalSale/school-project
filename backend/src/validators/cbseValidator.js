const { body } = require('express-validator');

const generalInfoValidator = [
  body('schoolName').trim().notEmpty().withMessage('School name is required'),
  body('affiliationNo').trim().notEmpty().withMessage('Affiliation number is required'),
  body('schoolCode').trim().notEmpty().withMessage('School code is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('principalName').trim().notEmpty().withMessage('Principal name is required'),
  body('principalQualification').trim().notEmpty().withMessage('Principal qualification is required'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
  body('contactNumber').trim().notEmpty().withMessage('Contact number is required'),
  body('campusArea').trim().notEmpty().withMessage('Campus area is required'),
];

const staffDetailsValidator = [
  body('totalTeaching').isInt({ min: 0 }).withMessage('Total teaching staff must be a positive number'),
  body('pgt').isInt({ min: 0 }).withMessage('PGT must be a positive number'),
  body('tgt').isInt({ min: 0 }).withMessage('TGT must be a positive number'),
  body('prt').isInt({ min: 0 }).withMessage('PRT must be a positive number'),
  body('nonTeaching').isInt({ min: 0 }).withMessage('Non-teaching staff must be a positive number'),
];

const feeStructureValidator = [
  body('class1To5').isNumeric().withMessage('Fee for classes 1-5 must be a number'),
  body('class6To8').isNumeric().withMessage('Fee for classes 6-8 must be a number'),
  body('class9To10').isNumeric().withMessage('Fee for classes 9-10 must be a number'),
  body('class11To12').isNumeric().withMessage('Fee for classes 11-12 must be a number'),
];

const documentValidator = [
  body('name').trim().notEmpty().withMessage('Document name is required'),
  body('url').trim().notEmpty().withMessage('Document URL is required'),
];

const infrastructureValidator = [
  body('item').trim().notEmpty().withMessage('Item name is required'),
  body('value').trim().notEmpty().withMessage('Value is required'),
];

module.exports = {
  generalInfoValidator,
  staffDetailsValidator,
  feeStructureValidator,
  documentValidator,
  infrastructureValidator,
};
