const db = require('../config/database');

// Helper function to convert snake_case to camelCase
const toCamelCase = (obj) => {
  if (!obj) return obj;
  const camelObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
};

// Helper function to convert camelCase to snake_case
const toSnakeCase = (obj) => {
  if (!obj) return obj;
  const snakeObj = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    snakeObj[snakeKey] = obj[key];
  }
  return snakeObj;
};

// ============ GENERAL INFO (Single Row) ============

const getGeneralInfo = async (req, res, next) => {
  try {
    const info = await db('cbse_general_info').first();
    res.json({ success: true, data: toCamelCase(info) });
  } catch (error) {
    next(error);
  }
};

const updateGeneralInfo = async (req, res, next) => {
  try {
    // Convert camelCase from frontend to snake_case for database
    const snakeData = toSnakeCase(req.body);
    const {
      school_name,
      affiliation_no,
      school_code,
      address,
      principal_name,
      principal_qualification,
      email,
      contact_number,
      campus_area,
    } = snakeData;

    // Check if record exists
    const existing = await db('cbse_general_info').first();

    if (existing) {
      // Update existing
      await db('cbse_general_info').where({ id: existing.id }).update({
        school_name,
        affiliation_no,
        school_code,
        address,
        principal_name,
        principal_qualification,
        email,
        contact_number,
        campus_area,
        updated_at: db.fn.now(),
      });
    } else {
      // Insert new
      await db('cbse_general_info').insert({
        school_name,
        affiliation_no,
        school_code,
        address,
        principal_name,
        principal_qualification,
        email,
        contact_number,
        campus_area,
      });
    }

    const updatedInfo = await db('cbse_general_info').first();

    res.json({
      success: true,
      message: 'General information updated successfully',
      data: toCamelCase(updatedInfo),
    });
  } catch (error) {
    next(error);
  }
};

// ============ STAFF DETAILS (Single Row) ============

const getStaffDetails = async (req, res, next) => {
  try {
    const staff = await db('cbse_staff_details').first();
    res.json({ success: true, data: toCamelCase(staff) });
  } catch (error) {
    next(error);
  }
};

const updateStaffDetails = async (req, res, next) => {
  try {
    const snakeData = toSnakeCase(req.body);
    const { total_teaching, pgt, tgt, prt, non_teaching } = snakeData;

    const existing = await db('cbse_staff_details').first();

    if (existing) {
      await db('cbse_staff_details').where({ id: existing.id }).update({
        total_teaching,
        pgt,
        tgt,
        prt,
        non_teaching,
        updated_at: db.fn.now(),
      });
    } else {
      await db('cbse_staff_details').insert({
        total_teaching,
        pgt,
        tgt,
        prt,
        non_teaching,
      });
    }

    const updatedStaff = await db('cbse_staff_details').first();

    res.json({
      success: true,
      message: 'Staff details updated successfully',
      data: toCamelCase(updatedStaff),
    });
  } catch (error) {
    next(error);
  }
};

// ============ FEE STRUCTURE (Single Row) ============

const getFeeStructure = async (req, res, next) => {
  try {
    const fees = await db('cbse_fee_structure').first();
    res.json({ success: true, data: toCamelCase(fees) });
  } catch (error) {
    next(error);
  }
};

const updateFeeStructure = async (req, res, next) => {
  try {
    const snakeData = toSnakeCase(req.body);
    const { class_1_to_5, class_6_to_8, class_9_to_10, class_11_to_12 } = snakeData;

    const existing = await db('cbse_fee_structure').first();

    if (existing) {
      await db('cbse_fee_structure').where({ id: existing.id }).update({
        class_1_to_5,
        class_6_to_8,
        class_9_to_10,
        class_11_to_12,
        updated_at: db.fn.now(),
      });
    } else {
      await db('cbse_fee_structure').insert({
        class_1_to_5,
        class_6_to_8,
        class_9_to_10,
        class_11_to_12,
      });
    }

    const updatedFees = await db('cbse_fee_structure').first();

    res.json({
      success: true,
      message: 'Fee structure updated successfully',
      data: toCamelCase(updatedFees),
    });
  } catch (error) {
    next(error);
  }
};

// ============ DOCUMENTS (Multiple Rows) ============

const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await db('cbse_documents').orderBy('created_at', 'desc');
    res.json({ success: true, data: documents });
  } catch (error) {
    next(error);
  }
};

const getDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await db('cbse_documents').where({ id }).first();

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, data: document });
  } catch (error) {
    next(error);
  }
};

const createDocument = async (req, res, next) => {
  try {
    const { name, url } = req.body;

    const [id] = await db('cbse_documents').insert({ name, url }).returning('id');
    const newDocument = await db('cbse_documents').where({ id }).first();

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
    const { name, url } = req.body;

    const document = await db('cbse_documents').where({ id }).first();
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    await db('cbse_documents').where({ id }).update({
      name,
      url,
      updated_at: db.fn.now(),
    });

    const updatedDocument = await db('cbse_documents').where({ id }).first();

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

    const document = await db('cbse_documents').where({ id }).first();
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    await db('cbse_documents').where({ id }).del();

    res.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============ INFRASTRUCTURE (Multiple Rows) ============

const getAllInfrastructure = async (req, res, next) => {
  try {
    const infrastructure = await db('cbse_infrastructure').orderBy('created_at', 'desc');
    res.json({ success: true, data: infrastructure });
  } catch (error) {
    next(error);
  }
};

const getInfrastructureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await db('cbse_infrastructure').where({ id }).first();

    if (!item) {
      return res.status(404).json({ success: false, message: 'Infrastructure item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const createInfrastructure = async (req, res, next) => {
  try {
    const { item, value } = req.body;

    const [id] = await db('cbse_infrastructure').insert({ item, value }).returning('id');
    const newItem = await db('cbse_infrastructure').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Infrastructure item added successfully',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateInfrastructure = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { item, value } = req.body;

    const existingItem = await db('cbse_infrastructure').where({ id }).first();
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Infrastructure item not found' });
    }

    await db('cbse_infrastructure').where({ id }).update({
      item,
      value,
      updated_at: db.fn.now(),
    });

    const updatedItem = await db('cbse_infrastructure').where({ id }).first();

    res.json({
      success: true,
      message: 'Infrastructure item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

const deleteInfrastructure = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await db('cbse_infrastructure').where({ id }).first();
    if (!item) {
      return res.status(404).json({ success: false, message: 'Infrastructure item not found' });
    }

    await db('cbse_infrastructure').where({ id }).del();

    res.json({
      success: true,
      message: 'Infrastructure item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ============ GET ALL CBSE DATA (Combined) ============

const getAllCBSEData = async (req, res, next) => {
  try {
    const generalInfo = await db('cbse_general_info').first();
    const staffDetails = await db('cbse_staff_details').first();
    const feeStructure = await db('cbse_fee_structure').first();
    const documents = await db('cbse_documents').orderBy('created_at', 'desc');
    const infrastructure = await db('cbse_infrastructure').orderBy('created_at', 'desc');

    res.json({
      success: true,
      data: {
        generalInfo: toCamelCase(generalInfo),
        staffDetails: toCamelCase(staffDetails),
        feeStructure: toCamelCase(feeStructure),
        documents,
        infrastructure,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // General Info
  getGeneralInfo,
  updateGeneralInfo,
  // Staff Details
  getStaffDetails,
  updateStaffDetails,
  // Fee Structure
  getFeeStructure,
  updateFeeStructure,
  // Documents
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  // Infrastructure
  getAllInfrastructure,
  getInfrastructureById,
  createInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
  // Combined
  getAllCBSEData,
};
