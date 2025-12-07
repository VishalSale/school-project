import { Target, Eye, History, Award } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Learn about our mission, vision, and journey</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card mission-card">
              <Target size={48} className="card-icon" />
              <h2>Our Mission</h2>
              <p>
                To provide quality education that empowers students with knowledge, skills, and values 
                necessary to become responsible global citizens. We strive to create a nurturing environment 
                where every child can discover their potential and achieve excellence.
              </p>
            </div>
            <div className="card vision-card">
              <Eye size={48} className="card-icon" />
              <h2>Our Vision</h2>
              <p>
                To be a leading educational institution recognized for academic excellence, innovative 
                teaching methods, and holistic development. We envision creating future leaders who are 
                intellectually curious, socially responsible, and globally competitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section history-section">
        <div className="container">
          <div className="section-title">
            <History size={48} />
            <h2>Our History</h2>
          </div>
          <div className="history-content">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">1995</div>
                <div className="timeline-content">
                  <h3>Foundation</h3>
                  <p>Bright Future School was established with a vision to provide quality education to students.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2000</div>
                <div className="timeline-content">
                  <h3>CBSE Affiliation</h3>
                  <p>Received CBSE affiliation, marking a significant milestone in our journey.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2010</div>
                <div className="timeline-content">
                  <h3>Infrastructure Expansion</h3>
                  <p>Expanded facilities with new science labs, computer labs, and sports complex.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2020</div>
                <div className="timeline-content">
                  <h3>Digital Transformation</h3>
                  <p>Implemented smart classrooms and digital learning platforms.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2025</div>
                <div className="timeline-content">
                  <h3>Excellence Continues</h3>
                  <p>Celebrating 30 years of academic excellence and holistic education.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-title">
            <Award size={48} />
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="grid grid-3">
            <div className="value-card">
              <h3>Excellence</h3>
              <p>Striving for the highest standards in academics and character development.</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>Fostering honesty, transparency, and ethical behavior in all aspects.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Embracing modern teaching methods and creative problem-solving.</p>
            </div>
            <div className="value-card">
              <h3>Respect</h3>
              <p>Valuing diversity and promoting mutual respect among all members.</p>
            </div>
            <div className="value-card">
              <h3>Collaboration</h3>
              <p>Encouraging teamwork and partnership between students, teachers, and parents.</p>
            </div>
            <div className="value-card">
              <h3>Responsibility</h3>
              <p>Developing accountable and socially conscious global citizens.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
