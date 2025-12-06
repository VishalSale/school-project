const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/galleryController');
const { galleryValidator } = require('../validators/galleryValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAll);
router.get('/:id', getById);

// Admin routes
router.post('/', authenticate, isAdmin, galleryValidator, validate, create);
router.put('/:id', authenticate, isAdmin, galleryValidator, validate, update);
router.delete('/:id', authenticate, isAdmin, remove);

module.exports = router;
