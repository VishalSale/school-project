import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, X, Mail, Award } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

const FacultyManager = () => {
  const { facultyData, setFacultyData } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    qualification: '',
    experience: '',
    email: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      setFacultyData(facultyData.map(item =>
        item.id === editingId ? { ...item, ...formData } : item
      ));
    } else {
      const newMember = { id: Date.now(), ...formData };
      setFacultyData([...facultyData, newMember]);
    }
    
    resetForm();
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      position: member.position,
      qualification: member.qualification,
      experience: member.experience,
      email: member.email,
      image: member.image
    });
    setEditingId(member.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      setFacultyData(facultyData.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      qualification: '',
      experience: '',
      email: '',
      image: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage Faculty</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? 'Cancel' : 'Add Faculty Member'}</span>
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Edit Faculty Member' : 'Add New Faculty Member'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Dr. John Smith"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., Mathematics Teacher"
                  required
                />
              </div>
              <div className="form-group">
                <label>Qualification *</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g., M.Sc. Mathematics"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Experience *</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 10 years"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@school.edu"
                  required
                />
              </div>
            </div>

            <ImageUpload 
              value={formData.image} 
              onChange={(imageUrl) => setFormData({...formData, image: imageUrl})}
              label="Upload Faculty Photo *"
            />

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Add Faculty'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-list">
        {facultyData.length === 0 ? (
          <p className="no-data">No faculty members yet. Add your first one!</p>
        ) : (
          facultyData.map((member) => (
            <div key={member.id} className="item-card faculty-item">
              <div className="faculty-item-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="faculty-item-content">
                <div className="item-header">
                  <div>
                    <h3>{member.name}</h3>
                    <p className="item-category">{member.position}</p>
                  </div>
                  <div className="item-actions">
                    <button className="icon-btn" onClick={() => handleEdit(member)}>
                      <Edit size={18} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(member.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="faculty-details">
                  <p><Award size={16} /> {member.qualification}</p>
                  <p><strong>Experience:</strong> {member.experience}</p>
                  <p><Mail size={16} /> {member.email}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FacultyManager;
