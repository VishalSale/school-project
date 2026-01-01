const db = require('../config/database');

// ============ CURRICULUM ============

const getAllCurriculum = async (req, res, next) => {
  try {
    const curriculum = await db('curriculum')
      .whereNot({ status: 'deleted' })
      .orderBy('created_at', 'desc');
    
    // Convert subjects string to array for frontend
    const formattedCurriculum = curriculum.map(item => ({
      ...item,
      subjects: item.subjects ? item.subjects.split(',').map(s => s.trim()) : [],
    }));
    
    res.json({ success: true, data: formattedCurriculum });
  } catch (error) {
    next(error);
  }
};

const getCurriculumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await db('curriculum').where({ id }).first();

    if (!item) {
      return res.status(404).json({ success: false, message: 'Curriculum not found' });
    }

    // Convert subjects string to array
    item.subjects = item.subjects ? item.subjects.split(',').map(s => s.trim()) : [];

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const createCurriculum = async (req, res, next) => {
  try {
    const { title, subjects, description, icon } = req.body;

    // Convert array to comma-separated string for database
    const subjectsString = Array.isArray(subjects) 
      ? subjects.join(', ') 
      : subjects;

    const [id] = await db('curriculum').insert({
      title,
      subjects: subjectsString,
      description,
      icon,
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
    }).returning('id');

    const newItem = await db('curriculum').where({ id }).first();
    
    // Convert back to array for response
    newItem.subjects = newItem.subjects ? newItem.subjects.split(',').map(s => s.trim()) : [];

    res.status(201).json({
      success: true,
      message: 'Curriculum added successfully',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateCurriculum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, subjects, description, icon } = req.body;

    const item = await db('curriculum').where({ id }).first();
    if (!item) {
      return res.status(404).json({ success: false, message: 'Curriculum not found' });
    }

    // Convert array to comma-separated string for database
    const subjectsString = Array.isArray(subjects) 
      ? subjects.join(', ') 
      : subjects;

    await db('curriculum').where({ id }).update({
      title,
      subjects: subjectsString,
      description,
      icon,
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedItem = await db('curriculum').where({ id }).first();
    
    // Convert back to array for response
    updatedItem.subjects = updatedItem.subjects ? updatedItem.subjects.split(',').map(s => s.trim()) : [];

    res.json({
      success: true,
      message: 'Curriculum updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCurriculum = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await db('curriculum').where({ id }).first();
    if (!item) {
      return res.status(404).json({ success: false, message: 'Curriculum not found' });
    }

    // Soft delete - change status to 'deleted'
    await db('curriculum').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Curriculum deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============ CLASS STRUCTURE ============

const getAllClassStructure = async (req, res, next) => {
  try {
    const classStructure = await db('class_structure')
      .whereNot({ status: 'deleted' })
      .orderBy('created_at', 'desc');
    res.json({ success: true, data: classStructure });
  } catch (error) {
    next(error);
  }
};

const getClassStructureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await db('class_structure').where({ id }).first();

    if (!item) {
      return res.status(404).json({ success: false, message: 'Class structure not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const createClassStructure = async (req, res, next) => {
  try {
    const { level, grades, focus } = req.body;

    const [id] = await db('class_structure').insert({
      level,
      grades,
      focus,
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
    }).returning('id');

    const newItem = await db('class_structure').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Class structure added successfully',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateClassStructure = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { level, grades, focus } = req.body;

    const item = await db('class_structure').where({ id }).first();
    if (!item) {
      return res.status(404).json({ success: false, message: 'Class structure not found' });
    }

    await db('class_structure').where({ id }).update({
      level,
      grades,
      focus,
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedItem = await db('class_structure').where({ id }).first();

    res.json({
      success: true,
      message: 'Class structure updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClassStructure = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await db('class_structure').where({ id }).first();
    if (!item) {
      return res.status(404).json({ success: false, message: 'Class structure not found' });
    }

    // Soft delete - change status to 'deleted'
    await db('class_structure').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Class structure deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============ ADDITIONAL PROGRAMS ============

const getAllPrograms = async (req, res, next) => {
  try {
    const programs = await db('additional_programs')
      .whereNot({ status: 'deleted' })
      .orderBy('created_at', 'desc');
    res.json({ success: true, data: programs });
  } catch (error) {
    next(error);
  }
};

const getProgramById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await db('additional_programs').where({ id }).first();

    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    res.json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

const createProgram = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const [id] = await db('additional_programs').insert({
      title,
      description,
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
    }).returning('id');

    const newProgram = await db('additional_programs').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Program added successfully',
      data: newProgram,
    });
  } catch (error) {
    next(error);
  }
};

const updateProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const program = await db('additional_programs').where({ id }).first();
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    await db('additional_programs').where({ id }).update({
      title,
      description,
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedProgram = await db('additional_programs').where({ id }).first();

    res.json({
      success: true,
      message: 'Program updated successfully',
      data: updatedProgram,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProgram = async (req, res, next) => {
  try {
    const { id } = req.params;

    const program = await db('additional_programs').where({ id }).first();
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    // Soft delete - change status to 'deleted'
    await db('additional_programs').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Curriculum
  getAllCurriculum,
  getCurriculumById,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
  // Class Structure
  getAllClassStructure,
  getClassStructureById,
  createClassStructure,
  updateClassStructure,
  deleteClassStructure,
  // Additional Programs
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
