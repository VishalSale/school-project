import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Building, Users, Award, FileText, DollarSign, Plus, Edit, Trash2, X } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

const CBSEManager = () => {
  const { cbseData, setCbseData } = useData();
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('general');

  const [generalInfo, setGeneralInfo] = useState(cbseData.generalInfo || {});
  const [staffDetails, setStaffDetails] = useState(cbseData.staffDetails || {});
  const [feeStructure, setFeeStructure] = useState(cbseData.feeStructure || {});
  const [documents, setDocuments] = useState(cbseData.documents || []);
  const [infrastructure, setInfrastructure] = useState(cbseData.infrastructure || []);
  
  const [showDocForm, setShowDocForm] = useState(false);
  const [showInfraForm, setShowInfraForm] = useState(false);
  const [editingDocId, setEditingDocId] = useState(null);
  const [editingInfraId, setEditingInfraId] = useState(null);
  
  const [docFormData, setDocFormData] = useState({ name: '', url: '' });
  const [infraFormData, setInfraFormData] = useState({ item: '', value: '' });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setCbseData({ ...cbseData, generalInfo });
    showToast('General information updated successfully!', 'success');
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    setCbseData({ ...cbseData, staffDetails });
    showToast('Staff details updated successfully!', 'success');
  };

  const handleSaveFees = (e) => {
    e.preventDefault();
    setCbseData({ ...cbseData, feeStructure });
    showToast('Fee structure updated successfully!', 'success');
  };

  // Documents CRUD
  const handleAddDocument = (e) => {
    e.preventDefault();
    if (editingDocId) {
      const updated = documents.map(doc =>
        doc.id === editingDocId ? { ...doc, ...docFormData } : doc
      );
      setDocuments(updated);
      setCbseData({ ...cbseData, documents: updated });
      showToast('Document updated successfully!', 'success');
    } else {
      const newDoc = { id: Date.now(), ...docFormData };
      const updated = [...documents, newDoc];
      setDocuments(updated);
      setCbseData({ ...cbseData, documents: updated });
      showToast('Document added successfully!', 'success');
    }
    setDocFormData({ name: '', url: '' });
    setShowDocForm(false);
    setEditingDocId(null);
  };

  const handleEditDocument = (doc) => {
    setDocFormData({ name: doc.name, url: doc.url });
    setEditingDocId(doc.id);
    setShowDocForm(true);
  };

  const handleDeleteDocument = (id) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const updated = documents.filter(doc => doc.id !== id);
      setDocuments(updated);
      setCbseData({ ...cbseData, documents: updated });
      showToast('Document deleted successfully!', 'success');
    }
  };

  // Infrastructure CRUD
  const handleAddInfrastructure = (e) => {
    e.preventDefault();
    if (editingInfraId) {
      const updated = infrastructure.map(item =>
        item.id === editingInfraId ? { ...item, ...infraFormData } : item
      );
      setInfrastructure(updated);
      setCbseData({ ...cbseData, infrastructure: updated });
      showToast('Infrastructure item updated successfully!', 'success');
    } else {
      const newItem = { id: Date.now(), ...infraFormData };
      const updated = [...infrastructure, newItem];
      setInfrastructure(updated);
      setCbseData({ ...cbseData, infrastructure: updated });
      showToast('Infrastructure item added successfully!', 'success');
    }
    setInfraFormData({ item: '', value: '' });
    setShowInfraForm(false);
    setEditingInfraId(null);
  };

  const handleEditInfrastructure = (item) => {
    setInfraFormData({ item: item.item, value: item.value });
    setEditingInfraId(item.id);
    setShowInfraForm(true);
  };

  const handleDeleteInfrastructure = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updated = infrastructure.filter(item => item.id !== id);
      setInfrastructure(updated);
      setCbseData({ ...cbseData, infrastructure: updated });
      showToast('Infrastructure item deleted successfully!', 'success');
    }
  };

  return (
    <div className="manager-container">
      <div className="content-header">
        <h1>Manage CBSE Disclosure</h1>
      </div>

      <div className="section-tabs">
        <button
          className={activeSection === 'general' ? 'active' : ''}
          onClick={() => setActiveSection('general')}
        >
          <Building size={20} />
          <span>General Info</span>
        </button>
        <button
          className={activeSection === 'staff' ? 'active' : ''}
          onClick={() => setActiveSection('staff')}
        >
          <Users size={20} />
          <span>Staff Details</span>
        </button>
        <button
          className={activeSection === 'fees' ? 'active' : ''}
          onClick={() => setActiveSection('fees')}
        >
          <DollarSign size={20} />
          <span>Fee Structure</span>
        </button>
        <button
          className={activeSection === 'documents' ? 'active' : ''}
          onClick={() => setActiveSection('documents')}
        >
          <FileText size={20} />
          <span>Documents</span>
        </button>
        <button
          className={activeSection === 'infrastructure' ? 'active' : ''}
          onClick={() => setActiveSection('infrastructure')}
        >
          <Award size={20} />
          <span>Infrastructure</span>
        </button>
      </div>

      {/* General Information */}
      {activeSection === 'general' && (
        <div className="form-card">
          <h3>General Information</h3>
          <form onSubmit={handleSaveGeneral}>
            <div className="form-row">
              <div className="form-group">
                <label>School Name *</label>
                <input
                  type="text"
                  value={generalInfo.schoolName}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, schoolName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Affiliation Number *</label>
                <input
                  type="text"
                  value={generalInfo.affiliationNo}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, affiliationNo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>School Code *</label>
                <input
                  type="text"
                  value={generalInfo.schoolCode}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, schoolCode: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Principal Name *</label>
                <input
                  type="text"
                  value={generalInfo.principalName}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, principalName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Principal Qualification *</label>
                <input
                  type="text"
                  value={generalInfo.principalQualification}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, principalQualification: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={generalInfo.email}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  value={generalInfo.contactNumber}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, contactNumber: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Campus Area *</label>
                <input
                  type="text"
                  value={generalInfo.campusArea}
                  onChange={(e) => setGeneralInfo({ ...generalInfo, campusArea: e.target.value })}
                  placeholder="e.g., 5 Acres"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Complete Address *</label>
              <textarea
                value={generalInfo.address}
                onChange={(e) => setGeneralInfo({ ...generalInfo, address: e.target.value })}
                rows="3"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Save General Information
            </button>
          </form>
        </div>
      )}

      {/* Staff Details */}
      {activeSection === 'staff' && (
        <div className="form-card">
          <h3>Staff Details</h3>
          <form onSubmit={handleSaveStaff}>
            <div className="form-row">
              <div className="form-group">
                <label>Total Teaching Staff *</label>
                <input
                  type="number"
                  value={staffDetails.totalTeaching}
                  onChange={(e) => setStaffDetails({ ...staffDetails, totalTeaching: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>PGT (Post Graduate Teachers) *</label>
                <input
                  type="number"
                  value={staffDetails.pgt}
                  onChange={(e) => setStaffDetails({ ...staffDetails, pgt: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>TGT (Trained Graduate Teachers) *</label>
                <input
                  type="number"
                  value={staffDetails.tgt}
                  onChange={(e) => setStaffDetails({ ...staffDetails, tgt: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>PRT (Primary Teachers) *</label>
                <input
                  type="number"
                  value={staffDetails.prt}
                  onChange={(e) => setStaffDetails({ ...staffDetails, prt: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Non-Teaching Staff *</label>
              <input
                type="number"
                value={staffDetails.nonTeaching}
                onChange={(e) => setStaffDetails({ ...staffDetails, nonTeaching: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Staff Details
            </button>
          </form>
        </div>
      )}

      {/* Fee Structure */}
      {activeSection === 'fees' && (
        <div className="form-card">
          <h3>Fee Structure (Annual)</h3>
          <form onSubmit={handleSaveFees}>
            <div className="form-row">
              <div className="form-group">
                <label>Classes 1-5 (₹) *</label>
                <input
                  type="number"
                  value={feeStructure.class1to5}
                  onChange={(e) => setFeeStructure({ ...feeStructure, class1to5: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Classes 6-8 (₹) *</label>
                <input
                  type="number"
                  value={feeStructure.class6to8}
                  onChange={(e) => setFeeStructure({ ...feeStructure, class6to8: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Classes 9-10 (₹) *</label>
                <input
                  type="number"
                  value={feeStructure.class9to10}
                  onChange={(e) => setFeeStructure({ ...feeStructure, class9to10: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Classes 11-12 (₹) *</label>
                <input
                  type="number"
                  value={feeStructure.class11to12}
                  onChange={(e) => setFeeStructure({ ...feeStructure, class11to12: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Fee Structure
            </button>
          </form>
        </div>
      )}

      {/* Documents & Certificates */}
      {activeSection === 'documents' && (
        <div className="manager-container">
          <div className="content-header">
            <h3>Documents & Certificates</h3>
            <button className="btn btn-primary" onClick={() => setShowDocForm(!showDocForm)}>
              {showDocForm ? <X size={20} /> : <Plus size={20} />}
              <span>{showDocForm ? 'Cancel' : 'Add Document'}</span>
            </button>
          </div>

          {showDocForm && (
            <div className="form-card">
              <h3>{editingDocId ? 'Edit Document' : 'Add New Document'}</h3>
              <form onSubmit={handleAddDocument}>
                <div className="form-group">
                  <label>Document Name *</label>
                  <input
                    type="text"
                    value={docFormData.name}
                    onChange={(e) => setDocFormData({ ...docFormData, name: e.target.value })}
                    placeholder="e.g., CBSE Affiliation Certificate"
                    required
                  />
                </div>
                <ImageUpload 
                  value={docFormData.url} 
                  onChange={(imageUrl) => setDocFormData({...docFormData, url: imageUrl})}
                  label="Upload Document/Certificate Image *"
                />
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingDocId ? 'Update' : 'Add Document'}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => {
                    setShowDocForm(false);
                    setEditingDocId(null);
                    setDocFormData({ name: '', url: '' });
                  }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="items-list">
            {documents.length === 0 ? (
              <p className="no-data">No documents added yet.</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="item-card">
                  <div className="blog-item">
                    <div className="blog-item-image">
                      <img src={doc.url} alt={doc.name} />
                    </div>
                    <div className="blog-item-content">
                      <div className="item-header">
                        <div>
                          <h3>{doc.name}</h3>
                        </div>
                        <div className="item-actions">
                          <button className="icon-btn" onClick={() => handleEditDocument(doc)}>
                            <Edit size={18} />
                          </button>
                          <button className="icon-btn delete" onClick={() => handleDeleteDocument(doc.id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Infrastructure & Facilities */}
      {activeSection === 'infrastructure' && (
        <div className="manager-container">
          <div className="content-header">
            <h3>Infrastructure & Facilities</h3>
            <button className="btn btn-primary" onClick={() => setShowInfraForm(!showInfraForm)}>
              {showInfraForm ? <X size={20} /> : <Plus size={20} />}
              <span>{showInfraForm ? 'Cancel' : 'Add Item'}</span>
            </button>
          </div>

          {showInfraForm && (
            <div className="form-card">
              <h3>{editingInfraId ? 'Edit Infrastructure Item' : 'Add New Item'}</h3>
              <form onSubmit={handleAddInfrastructure}>
                <div className="form-group">
                  <label>Facility/Item Name *</label>
                  <input
                    type="text"
                    value={infraFormData.item}
                    onChange={(e) => setInfraFormData({ ...infraFormData, item: e.target.value })}
                    placeholder="e.g., Science Labs"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Value/Description *</label>
                  <input
                    type="text"
                    value={infraFormData.value}
                    onChange={(e) => setInfraFormData({ ...infraFormData, value: e.target.value })}
                    placeholder="e.g., 5 or Yes (with details)"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingInfraId ? 'Update' : 'Add Item'}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => {
                    setShowInfraForm(false);
                    setEditingInfraId(null);
                    setInfraFormData({ item: '', value: '' });
                  }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="items-list">
            {infrastructure.length === 0 ? (
              <p className="no-data">No infrastructure items added yet.</p>
            ) : (
              infrastructure.map((item) => (
                <div key={item.id} className="item-card compact">
                  <div className="item-header">
                    <div>
                      <h3>{item.item}</h3>
                      <p className="item-category">{item.value}</p>
                    </div>
                    <div className="item-actions">
                      <button className="icon-btn" onClick={() => handleEditInfrastructure(item)}>
                        <Edit size={18} />
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDeleteInfrastructure(item.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CBSEManager;
