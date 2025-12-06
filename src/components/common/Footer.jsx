import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Bright Future School</h3>
            <p>Empowering minds, shaping futures. Excellence in education since 1995.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/academics">Academics</Link></li>
              <li><Link to="/faculty">Faculty</Link></li>
              <li><Link to="/cbse-disclosure">CBSE Disclosure</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/announcements">Announcements</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Education Street, City, State 12345</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+91 123 456 7890</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>info@brightfuture.edu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bright Future School. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
