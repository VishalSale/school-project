import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit, Trash2, X, BookOpen, GraduationCap, Award } from 'lucide-react';

const AcademicsManager = () => {
  const { academicsData, setAcademicsData } = useData();
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('curriculum');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subjects: '',
    description: '',
    level: '',
    grades: '',
    focus: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let section, newItem;
    
    if (activeSection === 'curriculum') {
      section = 'curriculum';
      newItem = {
        id: editingId || Date.now(),
        title: formData.title,
        subjects: formData.subjects.split(',').map(s => s.trim()),
        description: formData.description,
        icon: 'BookOpen'
      };
    } else if (activeSection === 'structure') {
      section = 'classStructure';
      newItem = {
        id: editingId || Date.now(),
        level: formData.level,
        grades: formData.grades,
        focus: formData.focus
      };
    } else {
      section = 'additionalPrograms';
      newItem = {
        id: editingId || Date.now(),
        title: formData.title,
        description: formData.description
      };
    }
    
    if (editingId) {
      setAcademicsData({
        ...academicsData,
        [section]: academicsData[section].map(item =>
          item.id === editingId ? newItem : item
        )
      });
      showToast('Item updated successfully!', 'success');
    } else {
      setAcademicsData({
        ...academicsData,
        [section]: [...academicsData[section], newItem]
      });
      showToast('Item added successfully!', 'success');
    }
    
    resetForm();
  };

  const handleEdit = (item) => {
    if (activeSection === 'curriculum') {
      setFormData({
        title: item.title,
        subjects: item.subjects.join(', '),
        description: item.description
      });
    } else if (activeSection === 'structure') {
      setFormData({
        level: item.level,
        grades: item.grades,
        focus: item.focus
      });
    } else {
      setFormData({
        title: item.title,
        description: item.description
      });
    }
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const section = activeSection === 'curriculum' ? 'curriculum'
        : activeSection === 'structure' ? 'classStructure'
        : 'additionalPrograms';
      
      setAcademicsData({
        ...academicsData,
        [section]: academicsData[section].filter(item => item.id !== id)
      });
      showToast('Item deleted successfully!', 'success');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', subjects: '', description: '', level: '', grades: '', focus: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const getCurrentData = () => {
    if (activeSection === 'curriculum') return academicsData.curriculum;
    if (activeSection === 'structure') return academicsData.classStructure;
    return academicsData.additionalPrograms;
  };

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage Academics</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? 'Cancel' : 'Add New'}</span>
        </button>
      </div>

      <div className="section-tabs">
        <button
          className={activeSection === 'curriculum' ? 'active' : ''}
          onClick={() => { setActiveSection('curriculum'); resetForm(); }}
        >
          <BookOpen size={18} />
          Curriculum
        </button>
        <button
          className={activeSection === 'structure' ? 'active' : ''}
          onClick={() => { setActiveSection('structure'); resetForm(); }}
        >
          <GraduationCap size={18} />
          Class Structure
        </button>
        <button
          className={activeSection === 'programs' ? 'active' : ''}
          onClick={() => { setActiveSection('programs'); resetForm(); }}
        >
          <Award size={18} />
          Additional Programs
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Edit' : 'Add New'}</h3>
          <form onSubmit={handleSubmit}>
            {activeSection === 'curriculum' && (
              <>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Mathematics"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subjects (comma-separated) *</label>
                  <input
                    type="text"
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    placeholder="e.g., Algebra, Geometry, Statistics"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </>
            )}

            {activeSection === 'structure' && (
              <>
                <div className="form-group">
                  <label>Level *</label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="e.g., Primary"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Grades *</label>
                  <input
                    type="text"
                    value={formData.grades}
                    onChange={(e) => setFormData({ ...formData, grades: e.target.value })}
                    placeholder="e.g., Classes 1-5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Focus *</label>
                  <textarea
                    value={formData.focus}
                    onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                    rows="2"
                    required
                  ></textarea>
                </div>
              </>
            )}

            {activeSection === 'programs' && (
              <>
                <div className="form-group">
                  <label>Program Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Sports & Physical Education"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Add'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-list">
        {getCurrentData().length === 0 ? (
          <p className="no-data">No items yet. Add your first one!</p>
        ) : (
          getCurrentData().map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <div>
                  <h3>{item.title || item.level}</h3>
                  {activeSection === 'curriculum' && (
                    <div className="subjects-tags">
                      {item.subjects.map((subject, idx) => (
                        <span key={idx} className="badge">{subject}</span>
                      ))}
                    </div>
                  )}
                  {activeSection === 'structure' && (
                    <p className="item-category">{item.grades}</p>
                  )}
                </div>
                <div className="item-actions">
                  <button className="icon-btn" onClick={() => handleEdit(item)}>
                    <Edit size={18} />
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="item-content">{item.description || item.focus}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AcademicsManager;
