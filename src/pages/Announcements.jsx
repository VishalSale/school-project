import { useData } from '../context/DataContext';
import { Bell, Calendar, Pin } from 'lucide-react';
import './Announcements.css';

const Announcements = () => {
  const { announcementsData } = useData();

  const getCategoryColor = (category) => {
    const colors = {
      'Event': 'category-event',
      'Academic': 'category-academic',
      'Meeting': 'category-meeting',
      'Holiday': 'category-holiday'
    };
    return colors[category] || 'category-default';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const pinnedAnnouncements = announcementsData.filter(a => a.isPinned);
  const regularAnnouncements = announcementsData.filter(a => !a.isPinned);

  return (
    <div className="announcements-page">
      <section className="page-header">
        <div className="container">
          <h1>Announcements & Notices</h1>
          <p>Stay updated with latest school news and events</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Pinned Announcements */}
          {pinnedAnnouncements.length > 0 && (
            <div className="pinned-section">
              <h2><Pin size={24} /> Pinned Announcements</h2>
              <div className="announcements-grid">
                {pinnedAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="announcement-card pinned">
                    <div className="announcement-header">
                      <span className={`category-badge ${getCategoryColor(announcement.category)}`}>
                        {announcement.category}
                      </span>
                      <Pin size={18} className="pin-icon" />
                    </div>
                    <h3>{announcement.title}</h3>
                    <div className="announcement-date">
                      <Calendar size={16} />
                      <span>{formatDate(announcement.date)}</span>
                    </div>
                    <p>{announcement.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Announcements */}
          <div className="regular-section">
            <h2><Bell size={24} /> Recent Announcements</h2>
            <div className="announcements-list">
              {regularAnnouncements.map((announcement) => (
                <div key={announcement.id} className="announcement-card">
                  <div className="announcement-header">
                    <span className={`category-badge ${getCategoryColor(announcement.category)}`}>
                      {announcement.category}
                    </span>
                  </div>
                  <h3>{announcement.title}</h3>
                  <div className="announcement-date">
                    <Calendar size={16} />
                    <span>{formatDate(announcement.date)}</span>
                  </div>
                  <p>{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
