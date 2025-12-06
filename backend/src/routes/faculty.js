const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/facultyController');
const { facultyValidator } = require('../validators/facultyValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAll);
router.get('/:id', getById);

// Admin routes
router.post('/', authenticate, isAdmin, facultyValidator, validate, create);
router.put('/:id', authenticate, isAdmin, facultyValidator, validate, update);
router.delete('/:id', authenticate, isAdmin, remove);

module.exports = router;
