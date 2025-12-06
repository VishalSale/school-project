const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove, togglePin } = require('../controllers/announcementsController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAll);
router.get('/:id', getById);

// Admin routes
router.post('/', authenticate, isAdmin, create);
router.put('/:id', authenticate, isAdmin, update);
router.delete('/:id', authenticate, isAdmin, remove);
router.patch('/:id/toggle-pin', authenticate, isAdmin, togglePin);

module.exports = router;
