const db = require('../config/database');

// Get all contact submissions (Admin only)
const getAllSubmissions = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = db('contact_submissions').orderBy('created_at', 'desc');

    if (status) {
      query = query.where({ status });
    }

    const submissions = await query;
    res.json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

// Get single contact submission (Admin only)
const getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const submission = await db('contact_submissions').where({ id }).first();

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    res.json({ success: true, data: submission });
  } catch (error) {
    next(error);
  }
};

// Create contact submission (Public - no auth required)
const createSubmission = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const [id] = await db('contact_submissions').insert({
      name,
      email,
      phone,
      subject,
      message,
      status: 'unread',
    }).returning('id');

    const newSubmission = await db('contact_submissions').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      data: newSubmission,
    });
  } catch (error) {
    next(error);
  }
};

// Update submission status (Admin only)
const updateSubmissionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const submission = await db('contact_submissions').where({ id }).first();
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    await db('contact_submissions').where({ id }).update({
      status,
      updated_at: db.fn.now(),
    });

    const updatedSubmission = await db('contact_submissions').where({ id }).first();

    res.json({
      success: true,
      message: 'Submission status updated successfully',
      data: updatedSubmission,
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact submission (Admin only)
const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    const submission = await db('contact_submissions').where({ id }).first();
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    await db('contact_submissions').where({ id }).del();

    res.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmissionStatus,
  deleteSubmission,
};
