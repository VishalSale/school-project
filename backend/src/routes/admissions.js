const express = require('express');
const router = express.Router();
const {
  getAllDates,
  createDate,
  updateDate,
  deleteDate,
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/admissionsController');
const { dateValidator, documentValidator, applicationValidator } = require('../validators/admissionsValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// ============ DATES ============
// Public routes
router.get('/dates', getAllDates);

// Admin routes
router.post('/dates', authenticate, isAdmin, dateValidator, validate, createDate);
router.put('/dates/:id', authenticate, isAdmin, dateValidator, validate, updateDate);
router.delete('/dates/:id', authenticate, isAdmin, deleteDate);

// ============ DOCUMENTS ============
// Public routes
router.get('/documents', getAllDocuments);

// Admin routes
router.post('/documents', authenticate, isAdmin, documentValidator, validate, createDocument);
router.put('/documents/:id', authenticate, isAdmin, documentValidator, validate, updateDocument);
router.delete('/documents/:id', authenticate, isAdmin, deleteDocument);

// ============ APPLICATIONS ============
// Public route - anyone can submit application
router.post('/applications', applicationValidator, validate, createApplication);

// Admin routes
router.get('/applications', authenticate, isAdmin, getAllApplications);
router.get('/applications/:id', authenticate, isAdmin, getApplicationById);
router.patch('/applications/:id/status', authenticate, isAdmin, updateApplicationStatus);
router.delete('/applications/:id', authenticate, isAdmin, deleteApplication);

module.exports = router;
