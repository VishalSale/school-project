import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, FileText, GraduationCap, Users, Image, Calendar, Menu, X } from 'lucide-react';
import AdmissionsManager from '../components/admin/AdmissionsManager';
import AcademicsManager from '../components/admin/AcademicsManager';
import FacultyManager from '../components/admin/FacultyManager';
import GalleryManager from '../components/admin/GalleryManager';
import AnnouncementsManager from '../components/admin/AnnouncementsManager';
import BlogManager from '../components/admin/BlogManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('announcements');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'announcements':
        return <AnnouncementsManager />;
      case 'blog':
        return <BlogManager />;
      case 'admissions':
        return <AdmissionsManager />;
      case 'academics':
        return <AcademicsManager />;
      case 'faculty':
        return <FacultyManager />;
      case 'gallery':
        return <GalleryManager />;
      default:
        return <AnnouncementsManager />;
    }
  };

  return (
    <div className="admin-dashboard">
      {!isMobileMenuOpen && (
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
          <span>Menu</span>
        </button>
      )}

      {isMobileMenuOpen && (
        <button 
          className="mobile-menu-close"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
      )}

      <div className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>{user?.email}</p>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeTab === 'announcements' ? 'active' : ''}
            onClick={() => handleTabChange('announcements')}
          >
            <Bell size={20} />
            <span>Announcements</span>
          </button>
          <button
            className={activeTab === 'blog' ? 'active' : ''}
            onClick={() => handleTabChange('blog')}
          >
            <FileText size={20} />
            <span>Blog & News</span>
          </button>
          <button
            className={activeTab === 'admissions' ? 'active' : ''}
            onClick={() => handleTabChange('admissions')}
          >
            <Calendar size={20} />
            <span>Admissions</span>
          </button>
          <button
            className={activeTab === 'academics' ? 'active' : ''}
            onClick={() => handleTabChange('academics')}
          >
            <GraduationCap size={20} />
            <span>Academics</span>
          </button>
          <button
            className={activeTab === 'faculty' ? 'active' : ''}
            onClick={() => handleTabChange('faculty')}
          >
            <Users size={20} />
            <span>Faculty</span>
          </button>
          <button
            className={activeTab === 'gallery' ? 'active' : ''}
            onClick={() => handleTabChange('gallery')}
          >
            <Image size={20} />
            <span>Gallery</span>
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
