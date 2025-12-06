import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2, CheckCircle, X } from 'lucide-react';

const AnnouncementsManager = () => {
  const { announcementsData, setAnnouncementsData } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Event',
    content: '',
    isPinned: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing
      setAnnouncementsData(announcementsData.map(item =>
        item.id === editingId
          ? { ...item, ...formData }
          : item
      ));
      showToast('Announcement updated successfully!', 'success');
    } else {
      // Create new
      const newAnnouncement = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setAnnouncementsData([...announcementsData, newAnnouncement]);
      showToast('Announcement created successfully!', 'success');
    }
    
    resetForm();
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      category: announcement.category,
      content: announcement.content,
      isPinned: announcement.isPinned
    });
    setEditingId(announcement.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncementsData(announcementsData.filter(item => item.id !== id));
      showToast('Announcement deleted successfully!', 'success');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'Event', content: '', isPinned: false });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage Announcements</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? 'Cancel' : 'Add New'}</span>
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Edit Announcement' : 'Create New Announcement'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="Event">Event</option>
                <option value="Academic">Academic</option>
                <option value="Meeting">Meeting</option>
                <option value="Holiday">Holiday</option>
              </select>
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                />
                <span>Pin this announcement</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Publish'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-list">
        {announcementsData.length === 0 ? (
          <p className="no-data">No announcements yet. Create your first one!</p>
        ) : (
          announcementsData.map((announcement) => (
            <div key={announcement.id} className="item-card">
              <div className="item-header">
                <div>
                  <h3>{announcement.title}</h3>
                  {announcement.isPinned && <span className="badge badge-pinned">Pinned</span>}
                </div>
                <div className="item-actions">
                  <button className="icon-btn" onClick={() => handleEdit(announcement)}>
                    <Edit size={18} />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(announcement.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="item-category">{announcement.category}</p>
              <p className="item-content">{announcement.content}</p>
              <p className="item-date">Posted on: {announcement.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsManager;
