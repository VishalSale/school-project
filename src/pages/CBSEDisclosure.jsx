import { FileText, Building, Users, Award } from 'lucide-react';
import './CBSEDisclosure.css';

const CBSEDisclosure = () => {
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
                  <span>Bright Future School</span>
                </div>
                <div className="info-item">
                  <strong>Affiliation No:</strong>
                  <span>1234567</span>
                </div>
                <div className="info-item">
                  <strong>School Code:</strong>
                  <span>12345</span>
                </div>
                <div className="info-item">
                  <strong>Complete Address:</strong>
                  <span>123 Education Street, City, State - 12345</span>
                </div>
                <div className="info-item">
                  <strong>Principal Name:</strong>
                  <span>Dr. Sarah Johnson</span>
                </div>
                <div className="info-item">
                  <strong>Principal Qualification:</strong>
                  <span>Ph.D. in Education</span>
                </div>
                <div className="info-item">
                  <strong>Email:</strong>
                  <span>principal@brightfuture.edu</span>
                </div>
                <div className="info-item">
                  <strong>Contact Number:</strong>
                  <span>+91 123 456 7890</span>
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
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>CBSE Affiliation Certificate</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>Society Registration Certificate</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>No Objection Certificate (NOC)</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>Recognition Certificate</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>Building Safety Certificate</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>Fire Safety Certificate</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>DEO Certificate</span>
                </a>
                <a href="#" className="document-link">
                  <FileText size={20} />
                  <span>Annual Report</span>
                </a>
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
                  <span>100</span>
                </div>
                <div className="info-item">
                  <strong>PGT:</strong>
                  <span>25</span>
                </div>
                <div className="info-item">
                  <strong>TGT:</strong>
                  <span>40</span>
                </div>
                <div className="info-item">
                  <strong>PRT:</strong>
                  <span>35</span>
                </div>
                <div className="info-item">
                  <strong>Non-Teaching Staff:</strong>
                  <span>50</span>
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
                <div className="facility-item">Total Campus Area: 5 Acres</div>
                <div className="facility-item">Number of Classrooms: 60</div>
                <div className="facility-item">Science Labs: 5</div>
                <div className="facility-item">Computer Labs: 3</div>
                <div className="facility-item">Library: Yes (10,000+ books)</div>
                <div className="facility-item">Playground: Yes</div>
                <div className="facility-item">Sports Facilities: Cricket, Football, Basketball</div>
                <div className="facility-item">Medical Room: Yes</div>
                <div className="facility-item">Auditorium: Yes (500 capacity)</div>
                <div className="facility-item">Transport: Yes (20 buses)</div>
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
                  <span>₹50,000</span>
                </div>
                <div className="fee-row">
                  <span>Classes 6-8</span>
                  <span>₹60,000</span>
                </div>
                <div className="fee-row">
                  <span>Classes 9-10</span>
                  <span>₹70,000</span>
                </div>
                <div className="fee-row">
                  <span>Classes 11-12</span>
                  <span>₹80,000</span>
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
