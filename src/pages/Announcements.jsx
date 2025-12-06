import { useState, useEffect } from 'react';
import { Bell, Calendar, Pin } from 'lucide-react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // TODO: Fetch from API
    // const fetchAnnouncements = async () => {
    //   const response = await axios.get('/api/announcements');
    //   setAnnouncements(response.data);
    // };
    // fetchAnnouncements();

    // Mock data for now
    setAnnouncements([
      {
        id: 1,
        title: 'Annual Sports Day 2025',
        date: '2025-02-15',
        category: 'Event',
        isPinned: true,
        content: 'Annual Sports Day will be held on February 15, 2025. All students are requested to participate actively. Parents are invited to attend.'
      },
      {
        id: 2,
        title: 'Mid-Term Examination Schedule',
        date: '2025-02-10',
        category: 'Academic',
        isPinned: true,
        content: 'Mid-term examinations for all classes will commence from March 1, 2025. Detailed schedule will be shared with students.'
      },
      {
        id: 3,
        title: 'Parent-Teacher Meeting',
        date: '2025-02-05',
        category: 'Meeting',
        isPinned: false,
        content: 'Parent-Teacher meeting scheduled for February 20, 2025. Please check your email for appointment timings.'
      },
      {
        id: 4,
        title: 'Science Exhibition',
        date: '2025-01-28',
        category: 'Event',
        isPinned: false,
        content: 'Inter-school Science Exhibition will be organized on March 10, 2025. Students interested in participating should register by February 25.'
      },
      {
        id: 5,
        title: 'Holiday Notice',
        date: '2025-01-20',
        category: 'Holiday',
        isPinned: false,
        content: 'School will remain closed on February 26 (Mahashivratri) and March 8 (Holi). Classes will resume on March 11, 2025.'
      }
    ]);
  }, []);

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

  const pinnedAnnouncements = announcements.filter(a => a.isPinned);
  const regularAnnouncements = announcements.filter(a => !a.isPinned);

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
