import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    
    try {
      // TODO: Replace with your API endpoint
      console.log('Contact form submitted:', formData);
      // await axios.post('/api/contact', formData);
      
      setSubmitStatus('success');
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      showToast('Failed to send message. Please try again.', 'error');
    }
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any queries or information</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get In Touch</h2>
              <p>We're here to help and answer any question you might have.</p>

              <div className="contact-details">
                <div className="contact-item">
                  <MapPin size={24} />
                  <div>
                    <h4>Address</h4>
                    <p>123 Education Street, City, State 12345</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Phone size={24} />
                  <div>
                    <h4>Phone</h4>
                    <p>+91 123 456 7890</p>
                    <p>+91 098 765 4321</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Mail size={24} />
                  <div>
                    <h4>Email</h4>
                    <p>info@brightfuture.edu</p>
                    <p>admissions@brightfuture.edu</p>
                  </div>
                </div>

                <div className="contact-item">
                  <Clock size={24} />
                  <div>
                    <h4>Office Hours</h4>
                    <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert alert-error">
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-send-message">
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
