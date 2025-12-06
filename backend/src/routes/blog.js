const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  togglePublish,
} = require('../controllers/blogController');
const { blogValidator } = require('../validators/blogValidator');
const validate = require('../middleware/validate');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Admin routes
router.post('/', authenticate, isAdmin, blogValidator, validate, createPost);
router.put('/:id', authenticate, isAdmin, blogValidator, validate, updatePost);
router.delete('/:id', authenticate, isAdmin, deletePost);
router.patch('/:id/toggle-publish', authenticate, isAdmin, togglePublish);

module.exports = router;
