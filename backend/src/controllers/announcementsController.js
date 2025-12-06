const db = require('../config/database');

const getAll = async (req, res, next) => {
  try {
    const announcements = await db('announcements')
      .orderBy('is_pinned', 'desc')
      .orderBy('date', 'desc');
    
    res.json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const announcement = await db('announcements').where({ id }).first();

    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    res.json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, date, category, is_pinned, content } = req.body;

    const [id] = await db('announcements').insert({
      title,
      date,
      category,
      is_pinned: is_pinned || false,
      content,
    }).returning('id');

    const newAnnouncement = await db('announcements').where({ id }).first();

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: newAnnouncement,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, date, category, is_pinned, content } = req.body;

    const announcement = await db('announcements').where({ id }).first();
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await db('announcements').where({ id }).update({
      title,
      date,
      category,
      is_pinned,
      content,
      updated_at: db.fn.now(),
    });

    const updatedAnnouncement = await db('announcements').where({ id }).first();

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      data: updatedAnnouncement,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const announcement = await db('announcements').where({ id }).first();
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await db('announcements').where({ id }).del();

    res.json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const togglePin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const announcement = await db('announcements').where({ id }).first();
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    await db('announcements').where({ id }).update({
      is_pinned: !announcement.is_pinned,
      updated_at: db.fn.now(),
    });

    const updatedAnnouncement = await db('announcements').where({ id }).first();

    res.json({
      success: true,
      message: `Announcement ${updatedAnnouncement.is_pinned ? 'pinned' : 'unpinned'} successfully`,
      data: updatedAnnouncement,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, update, remove, togglePin };
