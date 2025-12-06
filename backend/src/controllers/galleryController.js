const db = require('../config/database');

const getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = db('gallery').orderBy('date', 'desc');
    
    if (category && category !== 'all') {
      query = query.where({ category });
    }

    const images = await query;
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await db('gallery').where({ id }).first();

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    res.json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { category, title, url, date } = req.body;

    const [id] = await db('gallery').insert({ category, title, url, date }).returning('id');
    const newImage = await db('gallery').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Image added successfully',
      data: newImage,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, title, url, date } = req.body;

    const image = await db('gallery').where({ id }).first();
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    await db('gallery').where({ id }).update({
      category,
      title,
      url,
      date,
      updated_at: db.fn.now(),
    });

    const updatedImage = await db('gallery').where({ id }).first();

    res.json({
      success: true,
      message: 'Image updated successfully',
      data: updatedImage,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await db('gallery').where({ id }).first();
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    await db('gallery').where({ id }).del();

    res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
