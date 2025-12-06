const express = require('express');
const router = express.Router();
const {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmissionStatus,
  deleteSubmission,
} = require('../controllers/contactController');
const { contactValidator } = require('../validators/contactValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public route - anyone can submit contact form
router.post('/', contactValidator, validate, createSubmission);

// Admin routes - manage submissions
router.get('/', authenticate, isAdmin, getAllSubmissions);
router.get('/:id', authenticate, isAdmin, getSubmissionById);
router.patch('/:id/status', authenticate, isAdmin, updateSubmissionStatus);
router.delete('/:id', authenticate, isAdmin, deleteSubmission);

module.exports = router;
