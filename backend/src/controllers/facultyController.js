const db = require('../config/database');

const getAll = async (req, res, next) => {
  try {
    const faculty = await db('faculty')
      .whereNot({ status: 'deleted' })
      .orderBy('created_at', 'desc');
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
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
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
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
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

    // Soft delete - change status to 'deleted'
    await db('faculty').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Faculty member deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
