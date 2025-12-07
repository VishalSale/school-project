import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp, Calendar, Bell } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <BookOpen size={40} />,
      title: 'Quality Education',
      description: 'CBSE curriculum with modern teaching methods and experienced faculty.'
    },
    {
      icon: <Users size={40} />,
      title: 'Expert Faculty',
      description: 'Highly qualified and dedicated teachers committed to student success.'
    },
    {
      icon: <Award size={40} />,
      title: 'Excellence',
      description: 'Consistent academic achievements and holistic development programs.'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Modern Facilities',
      description: 'State-of-the-art infrastructure, labs, library, and sports facilities.'
    }
  ];

  const stats = [
    { number: '2000+', label: 'Students' },
    { number: '100+', label: 'Teachers' },
    { number: '98%', label: 'Success Rate' },
    { number: '25+', label: 'Years' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Bright Future School</h1>
            <p>Nurturing Young Minds, Building Bright Futures</p>
            <div className="hero-buttons">
              <Link to="/admissions" className="btn btn-primary">Apply Now</Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Us</h2>
            <p>Providing excellence in education with a focus on holistic development</p>
          </div>
          <div className="grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="card feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section quick-links-section">
        <div className="container">
          <div className="grid grid-2">
            <div className="quick-link-card">
              <Calendar size={48} />
              <h3>Admissions Open</h3>
              <p>Enroll your child for the upcoming academic year. Limited seats available!</p>
              <Link to="/admissions" className="btn btn-primary">Apply Now</Link>
            </div>
            <div className="quick-link-card">
              <Bell size={48} />
              <h3>Latest Announcements</h3>
              <p>Stay updated with school events, holidays, and important notices.</p>
              <Link to="/announcements" className="btn btn-secondary">View All</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Join Our School Community?</h2>
          <p>Take the first step towards a brighter future for your child</p>
          <Link to="/contact" className="btn btn-primary">Contact Us Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
