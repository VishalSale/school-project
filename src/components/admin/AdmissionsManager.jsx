import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, X, Calendar, FileText } from 'lucide-react';

const AdmissionsManager = () => {
  const { admissionsData, setAdmissionsData } = useData();
  const [activeSection, setActiveSection] = useState('dates');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ label: '', date: '', name: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const section = activeSection === 'dates' ? 'importantDates' : 'requiredDocuments';
    const currentData = admissionsData[section];
    
    if (editingId) {
      setAdmissionsData({
        ...admissionsData,
        [section]: currentData.map(item =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      });
    } else {
      const newItem = { id: Date.now(), ...formData };
      setAdmissionsData({
        ...admissionsData,
        [section]: [...currentData, newItem]
      });
    }
    
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData(activeSection === 'dates'
      ? { label: item.label, date: item.date }
      : { name: item.name }
    );
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const section = activeSection === 'dates' ? 'importantDates' : 'requiredDocuments';
      setAdmissionsData({
        ...admissionsData,
        [section]: admissionsData[section].filter(item => item.id !== id)
      });
    }
  };

  const resetForm = () => {
    setFormData({ label: '', date: '', name: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const currentData = activeSection === 'dates'
    ? admissionsData.importantDates
    : admissionsData.requiredDocuments;

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage Admissions</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={20} /> : <Plus size={20} />}
          <span>{showForm ? 'Cancel' : 'Add New'}</span>
        </button>
      </div>

      <div className="section-tabs">
        <button
          className={activeSection === 'dates' ? 'active' : ''}
          onClick={() => { setActiveSection('dates'); resetForm(); }}
        >
          <Calendar size={18} />
          Important Dates
        </button>
        <button
          className={activeSection === 'documents' ? 'active' : ''}
          onClick={() => { setActiveSection('documents'); resetForm(); }}
        >
          <FileText size={18} />
          Required Documents
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? 'Edit' : 'Add New'} {activeSection === 'dates' ? 'Date' : 'Document'}</h3>
          <form onSubmit={handleSubmit}>
            {activeSection === 'dates' ? (
              <>
                <div className="form-group">
                  <label>Label *</label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g., Application Start"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>Document Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Birth Certificate"
                  required
                />
              </div>
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
        {currentData.length === 0 ? (
          <p className="no-data">No items yet. Add your first one!</p>
        ) : (
          currentData.map((item) => (
            <div key={item.id} className="item-card compact">
              <div className="item-header">
                <div>
                  {activeSection === 'dates' ? (
                    <>
                      <h3>{item.label}</h3>
                      <p className="item-date">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </>
                  ) : (
                    <h3>{item.name}</h3>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdmissionsManager;
