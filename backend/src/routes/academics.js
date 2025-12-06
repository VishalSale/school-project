const express = require('express');
const router = express.Router();
const {
  getAllCurriculum,
  getCurriculumById,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
  getAllClassStructure,
  getClassStructureById,
  createClassStructure,
  updateClassStructure,
  deleteClassStructure,
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/academicsController');
const { curriculumValidator, classStructureValidator, programValidator } = require('../validators/academicsValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// ============ CURRICULUM ============
// Public routes
router.get('/curriculum', getAllCurriculum);
router.get('/curriculum/:id', getCurriculumById);

// Admin routes
router.post('/curriculum', authenticate, isAdmin, curriculumValidator, validate, createCurriculum);
router.put('/curriculum/:id', authenticate, isAdmin, curriculumValidator, validate, updateCurriculum);
router.delete('/curriculum/:id', authenticate, isAdmin, deleteCurriculum);

// ============ CLASS STRUCTURE ============
// Public routes
router.get('/class-structure', getAllClassStructure);
router.get('/class-structure/:id', getClassStructureById);

// Admin routes
router.post('/class-structure', authenticate, isAdmin, classStructureValidator, validate, createClassStructure);
router.put('/class-structure/:id', authenticate, isAdmin, classStructureValidator, validate, updateClassStructure);
router.delete('/class-structure/:id', authenticate, isAdmin, deleteClassStructure);

// ============ ADDITIONAL PROGRAMS ============
// Public routes
router.get('/programs', getAllPrograms);
router.get('/programs/:id', getProgramById);

// Admin routes
router.post('/programs', authenticate, isAdmin, programValidator, validate, createProgram);
router.put('/programs/:id', authenticate, isAdmin, programValidator, validate, updateProgram);
router.delete('/programs/:id', authenticate, isAdmin, deleteProgram);

module.exports = router;
