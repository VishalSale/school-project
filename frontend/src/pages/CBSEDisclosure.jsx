import { useData } from '../context/DataContext';
import { FileText, Building, Users, Award } from 'lucide-react';
import './CBSEDisclosure.css';

const CBSEDisclosure = () => {
  const { cbseData } = useData();
  const { 
    generalInfo = {}, 
    staffDetails = {}, 
    feeStructure = {}, 
    documents = [], 
    infrastructure = [] 
  } = cbseData || {};

  return (
    <div className="cbse-page">
      <section className="page-header">
        <div className="container">
          <h1>CBSE Mandatory Disclosure</h1>
          <p>As per CBSE guidelines and regulations</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="disclosure-content">
            {/* General Information */}
            <div className="disclosure-section">
              <div className="section-header">
                <Building size={32} />
                <h2>General Information</h2>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <strong>School Name:</strong>
                  <span>{generalInfo.schoolName}</span>
                </div>
                <div className="info-item">
                  <strong>Affiliation No:</strong>
                  <span>{generalInfo.affiliationNo}</span>
                </div>
                <div className="info-item">
                  <strong>School Code:</strong>
                  <span>{generalInfo.schoolCode}</span>
                </div>
                <div className="info-item">
                  <strong>Complete Address:</strong>
                  <span>{generalInfo.address}</span>
                </div>
                <div className="info-item">
                  <strong>Principal Name:</strong>
                  <span>{generalInfo.principalName}</span>
                </div>
                <div className="info-item">
                  <strong>Principal Qualification:</strong>
                  <span>{generalInfo.principalQualification}</span>
                </div>
                <div className="info-item">
                  <strong>Email:</strong>
                  <span>{generalInfo.email}</span>
                </div>
                <div className="info-item">
                  <strong>Contact Number:</strong>
                  <span>{generalInfo.contactNumber}</span>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="disclosure-section">
              <div className="section-header">
                <FileText size={32} />
                <h2>Documents & Certificates</h2>
              </div>
              <div className="documents-list">
                {documents.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <div className="document-image">
                      <img src={doc.url} alt={doc.name} />
                    </div>
                    <div className="document-info">
                      <FileText size={20} />
                      <span>{doc.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Details */}
            <div className="disclosure-section">
              <div className="section-header">
                <Users size={32} />
                <h2>Staff Details</h2>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Total Teaching Staff:</strong>
                  <span>{staffDetails.totalTeaching}</span>
                </div>
                <div className="info-item">
                  <strong>PGT:</strong>
                  <span>{staffDetails.pgt}</span>
                </div>
                <div className="info-item">
                  <strong>TGT:</strong>
                  <span>{staffDetails.tgt}</span>
                </div>
                <div className="info-item">
                  <strong>PRT:</strong>
                  <span>{staffDetails.prt}</span>
                </div>
                <div className="info-item">
                  <strong>Non-Teaching Staff:</strong>
                  <span>{staffDetails.nonTeaching}</span>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="disclosure-section">
              <div className="section-header">
                <Award size={32} />
                <h2>Infrastructure & Facilities</h2>
              </div>
              <div className="facilities-grid">
                <div className="facility-item">Total Campus Area: {generalInfo.campusArea}</div>
                {infrastructure.map((item) => (
                  <div key={item.id} className="facility-item">
                    {item.item}: {item.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Fee Structure */}
            <div className="disclosure-section">
              <div className="section-header">
                <FileText size={32} />
                <h2>Fee Structure (Annual)</h2>
              </div>
              <div className="fee-table">
                <div className="fee-row">
                  <span>Classes 1-5</span>
                  <span>₹{parseInt(feeStructure.class1to5).toLocaleString('en-IN')}</span>
                </div>
                <div className="fee-row">
                  <span>Classes 6-8</span>
                  <span>₹{parseInt(feeStructure.class6to8).toLocaleString('en-IN')}</span>
                </div>
                <div className="fee-row">
                  <span>Classes 9-10</span>
                  <span>₹{parseInt(feeStructure.class9to10).toLocaleString('en-IN')}</span>
                </div>
                <div className="fee-row">
                  <span>Classes 11-12</span>
                  <span>₹{parseInt(feeStructure.class11to12).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CBSEDisclosure;
