const db = require('../config/database');

// ============ ADMISSION DATES ============

const getAllDates = async (req, res, next) => {
  try {
    const dates = await db('admission_dates')
      .whereNot({ status: 'deleted' })
      .orderBy('date', 'asc');
    res.json({ success: true, data: dates });
  } catch (error) {
    next(error);
  }
};

const createDate = async (req, res, next) => {
  try {
    const { label, date } = req.body;

    const [id] = await db('admission_dates').insert({
      label,
      date,
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
    }).returning('id');
    const newDate = await db('admission_dates').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Admission date added successfully',
      data: newDate,
    });
  } catch (error) {
    next(error);
  }
};

const updateDate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { label, date } = req.body;

    const existingDate = await db('admission_dates').where({ id }).first();
    if (!existingDate) {
      return res.status(404).json({ success: false, message: 'Date not found' });
    }

    await db('admission_dates').where({ id }).update({
      label,
      date,
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedDate = await db('admission_dates').where({ id }).first();

    res.json({
      success: true,
      message: 'Admission date updated successfully',
      data: updatedDate,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingDate = await db('admission_dates').where({ id }).first();
    if (!existingDate) {
      return res.status(404).json({ success: false, message: 'Date not found' });
    }

    // Soft delete - change status to 'deleted'
    await db('admission_dates').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Admission date deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============ ADMISSION DOCUMENTS ============

const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await db('admission_documents')
      .whereNot({ status: 'deleted' })
      .orderBy('created_at', 'desc');
    res.json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
};

const createDocument = async (req, res, next) => {
  try {
    const { name } = req.body;

    const [id] = await db('admission_documents').insert({
      name,
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
      status: 'active',
    }).returning('id');
    const newDocument = await db('admission_documents').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Document added successfully',
      data: newDocument,
    });
  } catch (error) {
    next(error);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingDoc = await db('admission_documents').where({ id }).first();
    if (!existingDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    await db('admission_documents').where({ id }).update({
      name,
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedDocument = await db('admission_documents').where({ id }).first();

    res.json({
      success: true,
      message: 'Document updated successfully',
      data: updatedDocument,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingDoc = await db('admission_documents').where({ id }).first();
    if (!existingDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Soft delete - change status to 'deleted'
    await db('admission_documents').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============ ADMISSION APPLICATIONS (Public Form Submissions) ============

const getAllApplications = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = db('admission_applications')
      .whereNot({ status: 'deleted' })
      .orderBy('created_at', 'desc');

    if (status && status !== 'deleted') {
      query = query.where({ status });
    }

    const applications = await query;
    res.json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await db('admission_applications').where({ id }).first();

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const {
      student_name,
      student_dob,
      student_gender,
      class_applying,
      previous_school,
      parent_name,
      parent_email,
      parent_phone,
      address,
    } = req.body;

    const [id] = await db('admission_applications').insert({
      student_name,
      student_dob,
      student_gender,
      class_applying,
      previous_school,
      parent_name,
      parent_email,
      parent_phone,
      address,
      status: 'pending',
      created_by_id: req.auditData?.created_by_id,
      created_by_name: req.auditData?.created_by_name,
      created_by_ip: req.auditData?.created_by_ip,
    }).returning('id');

    const newApplication = await db('admission_applications').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: newApplication,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await db('admission_applications').where({ id }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    await db('admission_applications').where({ id }).update({
      status,
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    const updatedApplication = await db('admission_applications').where({ id }).first();

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication,
    });
  } catch (error) {
    next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await db('admission_applications').where({ id }).first();
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Soft delete - change status to 'deleted'
    await db('admission_applications').where({ id }).update({
      status: 'deleted',
      updated_at: db.fn.now(),
      updated_by_id: req.auditData?.updated_by_id,
      updated_by_name: req.auditData?.updated_by_name,
      updated_by_ip: req.auditData?.updated_by_ip,
    });

    res.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Dates
  getAllDates,
  createDate,
  updateDate,
  deleteDate,
  // Documents
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  // Applications
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
};
