const db = require('../config/database');

// Get all blog posts (public - only published)
const getAllPosts = async (req, res, next) => {
  try {
    const { published } = req.query;
    
    let query = db('blog')
      .whereNot({ status: 'deleted' }) // Exclude soft-deleted items
      .orderBy('date', 'desc');
    
    // If not admin, only show published posts
    if (!req.user || published === 'true') {
      query = query.where({ published: true });
    }

    const posts = await query;

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// Get single blog post
const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await db('blog').where({ id }).first();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Create blog post (admin only)
const createPost = async (req, res, next) => {
  try {
    const { title, category, date, author, image, excerpt, content, published } = req.body;

    const [id] = await db('blog').insert({
      title,
      category,
      date,
      author,
      image,
      excerpt,
      content,
      published: published || false,
      // Audit fields
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
    }).returning('id');

    const newPost = await db('blog').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

// Update blog post (admin only)
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, date, author, image, excerpt, content, published } = req.body;

    const post = await db('blog').where({ id }).first();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await db('blog').where({ id }).update({
      title,
      category,
      date,
      author,
      image,
      excerpt,
      content,
      published,
      updated_at: db.fn.now(),
      // Audit fields
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedPost = await db('blog').where({ id }).first();

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog post (admin only) - Soft delete
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await db('blog').where({ id }).first();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Soft delete - change status to 'deleted'
    await db('blog').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Toggle publish status (admin only)
const togglePublish = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await db('blog').where({ id }).first();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await db('blog').where({ id }).update({
      published: !post.published,
      updated_at: db.fn.now(),
    });

    const updatedPost = await db('blog').where({ id }).first();

    res.json({
      success: true,
      message: `Blog post ${updatedPost.published ? 'published' : 'unpublished'} successfully`,
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  togglePublish,
};
