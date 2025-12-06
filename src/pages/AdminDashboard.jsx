import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, LogOut, Bell, FileText } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('announcements');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Event',
    content: '',
    isPinned: false
  });

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Replace with API call
    // await axios.post('/api/announcements', formData);
    
    console.log('New announcement:', formData);
    setShowForm(false);
    setFormData({ title: '', category: 'Event', content: '', isPinned: false });
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user?.email}</p>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === 'announcements' ? 'active' : ''}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell size={20} />
            <span>Announcements</span>
          </button>
          <button
            className={activeTab === 'news' ? 'active' : ''}
            onClick={() => setActiveTab('news')}
          >
            <FileText size={20} />
            <span>News & Updates</span>
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="admin-content">
        <div className="content-header">
          <h1>{activeTab === 'announcements' ? 'Manage Announcements' : 'Manage News'}</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            <Plus size={20} />
            <span>Add New</span>
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h3>Create New {activeTab === 'announcements' ? 'Announcement' : 'News'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
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
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPinned"
                    checked={formData.isPinned}
                    onChange={handleChange}
                  />
                  <span>Pin this announcement</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Publish</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="items-list">
          <div className="item-card">
            <div className="item-header">
              <h3>Sample Announcement</h3>
              <div className="item-actions">
                <button className="icon-btn"><Edit size={18} /></button>
                <button className="icon-btn delete"><Trash2 size={18} /></button>
              </div>
            </div>
            <p className="item-category">Event</p>
            <p className="item-content">This is a sample announcement. Your new announcements will appear here.</p>
            <p className="item-date">Posted on: Dec 6, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
