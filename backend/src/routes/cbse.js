const express = require('express');
const router = express.Router();
const {
  getGeneralInfo,
  updateGeneralInfo,
  getStaffDetails,
  updateStaffDetails,
  getFeeStructure,
  updateFeeStructure,
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getAllInfrastructure,
  getInfrastructureById,
  createInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
  getAllCBSEData,
} = require('../controllers/cbseController');
const {
  generalInfoValidator,
  staffDetailsValidator,
  feeStructureValidator,
  documentValidator,
  infrastructureValidator,
} = require('../validators/cbseValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// ============ GET ALL CBSE DATA (Combined) ============
// Public route - get all CBSE data at once
router.get('/', getAllCBSEData);

// ============ GENERAL INFO ============
// Public route
router.get('/general-info', getGeneralInfo);

// Admin route
router.put('/general-info', authenticate, isAdmin, generalInfoValidator, validate, updateGeneralInfo);

// ============ STAFF DETAILS ============
// Public route
router.get('/staff-details', getStaffDetails);

// Admin route
router.put('/staff-details', authenticate, isAdmin, staffDetailsValidator, validate, updateStaffDetails);

// ============ FEE STRUCTURE ============
// Public route
router.get('/fee-structure', getFeeStructure);

// Admin route
router.put('/fee-structure', authenticate, isAdmin, feeStructureValidator, validate, updateFeeStructure);

// ============ DOCUMENTS ============
// Public routes
router.get('/documents', getAllDocuments);
router.get('/documents/:id', getDocumentById);

// Admin routes
router.post('/documents', authenticate, isAdmin, documentValidator, validate, createDocument);
router.put('/documents/:id', authenticate, isAdmin, documentValidator, validate, updateDocument);
router.delete('/documents/:id', authenticate, isAdmin, deleteDocument);

// ============ INFRASTRUCTURE ============
// Public routes
router.get('/infrastructure', getAllInfrastructure);
router.get('/infrastructure/:id', getInfrastructureById);

// Admin routes
router.post('/infrastructure', authenticate, isAdmin, infrastructureValidator, validate, createInfrastructure);
router.put('/infrastructure/:id', authenticate, isAdmin, infrastructureValidator, validate, updateInfrastructure);
router.delete('/infrastructure/:id', authenticate, isAdmin, deleteInfrastructure);

module.exports = router;
