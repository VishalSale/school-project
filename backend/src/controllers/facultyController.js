const db = require('../config/database');

const getAll = async (req, res, next) => {
  try {
    const faculty = await db('faculty').orderBy('created_at', 'desc');
    res.json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await db('faculty').where({ id }).first();

    if (!member) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }

    res.json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, position, qualification, experience, email, image } = req.body;

    const [id] = await db('faculty').insert({
      name,
      position,
      qualification,
      experience,
      email,
      image,
    }).returning('id');

    const newMember = await db('faculty').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Faculty member added successfully',
      data: newMember,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, position, qualification, experience, email, image } = req.body;

    const member = await db('faculty').where({ id }).first();

    if (!member) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }

    await db('faculty').where({ id }).update({
      name,
      position,
      qualification,
      experience,
      email,
      image,
      updated_at: db.fn.now(),
    });

    const updatedMember = await db('faculty').where({ id }).first();

    res.json({
      success: true,
      message: 'Faculty member updated successfully',
      data: updatedMember,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const member = await db('faculty').where({ id }).first();

    if (!member) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }

    await db('faculty').where({ id }).del();

    res.json({
      success: true,
      message: 'Faculty member deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
