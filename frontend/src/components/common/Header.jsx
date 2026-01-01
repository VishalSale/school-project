import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/academics', label: 'Academics' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'News' },
    { path: '/announcements', label: 'Announcements' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmq59fQshjU5x1LTBMHi5SDrILg-IgMEa0_aE6w4c2Cyjll6spUXaiklNymVqpA-HehAg&usqp=CAU" 
              alt="Bright Future School" 
              className="logo-image"
            />
          </Link>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/login" className="btn btn-primary login-btn">
            Login
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
