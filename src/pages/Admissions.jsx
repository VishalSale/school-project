import { useState } from 'react';
import { FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import './Admissions.css';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    class: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Replace with your actual API endpoint
    try {
      // Simulated API call
      console.log('Form submitted:', formData);
      
      // Example API call (uncomment when backend is ready):
      // const response = await axios.post('/api/admissions', formData);
      
      setSubmitStatus('success');
      setFormData({
        studentName: '',
        dob: '',
        gender: '',
        class: '',
        parentName: '',
        email: '',
        phone: '',
        address: '',
        previousSchool: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="admissions-page">
      <section className="page-header">
        <div className="container">
          <h1>Admissions</h1>
          <p>Join our school community and embark on a journey of excellence</p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Admission Process</h2>
            <p>Simple steps to enroll your child</p>
          </div>
          <div className="grid grid-4">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Fill Application</h3>
              <p>Complete the online admission form with required details</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Submit Documents</h3>
              <p>Upload necessary documents and certificates</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Interview</h3>
              <p>Attend a brief interaction with school authorities</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Confirmation</h3>
              <p>Receive admission confirmation and complete enrollment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="section info-section">
        <div className="container">
          <div className="grid grid-2">
            <div className="info-card">
              <Calendar size={40} />
              <h3>Important Dates</h3>
              <ul>
                <li><strong>Application Start:</strong> January 1, 2025</li>
                <li><strong>Application Deadline:</strong> March 31, 2025</li>
                <li><strong>Entrance Test:</strong> April 15, 2025</li>
                <li><strong>Results:</strong> April 30, 2025</li>
                <li><strong>Session Begins:</strong> July 1, 2025</li>
              </ul>
            </div>
            <div className="info-card">
              <FileText size={40} />
              <h3>Required Documents</h3>
              <ul>
                <li>Birth Certificate (Original & Copy)</li>
                <li>Transfer Certificate (if applicable)</li>
                <li>Previous School Report Card</li>
                <li>Passport Size Photographs (4 copies)</li>
                <li>Address Proof</li>
                <li>Parent ID Proof</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section form-section">
        <div className="container">
          <div className="form-container">
            <h2>Online Admission Form</h2>
            <p>Fill in the details below to apply for admission</p>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                <CheckCircle size={20} />
                <span>Application submitted successfully! We'll contact you soon.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="admission-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Class Applying For *</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="nursery">Nursery</option>
                    <option value="lkg">LKG</option>
                    <option value="ukg">UKG</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Parent/Guardian Name *</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Previous School</label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
