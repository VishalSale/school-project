import { Mail, Award } from 'lucide-react';
import './Faculty.css';

const Faculty = () => {
  const faculty = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Principal',
      qualification: 'Ph.D. in Education',
      experience: '25 years',
      email: 'principal@brightfuture.edu',
      image: 'https://via.placeholder.com/300x300/2563eb/ffffff?text=SJ'
    },
    {
      name: 'Mr. Rajesh Kumar',
      position: 'Vice Principal',
      qualification: 'M.Ed., M.A.',
      experience: '20 years',
      email: 'vp@brightfuture.edu',
      image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=RK'
    },
    {
      name: 'Ms. Priya Sharma',
      position: 'Mathematics Teacher',
      qualification: 'M.Sc. Mathematics',
      experience: '15 years',
      email: 'priya@brightfuture.edu',
      image: 'https://via.placeholder.com/300x300/2563eb/ffffff?text=PS'
    },
    {
      name: 'Mr. David Wilson',
      position: 'Science Teacher',
      qualification: 'M.Sc. Physics',
      experience: '12 years',
      email: 'david@brightfuture.edu',
      image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=DW'
    },
    {
      name: 'Ms. Anjali Verma',
      position: 'English Teacher',
      qualification: 'M.A. English',
      experience: '10 years',
      email: 'anjali@brightfuture.edu',
      image: 'https://via.placeholder.com/300x300/2563eb/ffffff?text=AV'
    },
    {
      name: 'Mr. Michael Brown',
      position: 'Computer Science Teacher',
      qualification: 'M.Tech. CS',
      experience: '8 years',
      email: 'michael@brightfuture.edu',
      image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=MB'
    }
  ];

  return (
    <div className="faculty-page">
      <section className="page-header">
        <div className="container">
          <h1>Our Faculty</h1>
          <p>Meet our dedicated team of educators</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Experienced & Qualified Teachers</h2>
            <p>Our faculty members are committed to nurturing young minds</p>
          </div>

          <div className="faculty-grid">
            {faculty.map((member, index) => (
              <div key={index} className="faculty-card">
                <div className="faculty-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="faculty-info">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <div className="faculty-details">
                    <div className="detail-item">
                      <Award size={16} />
                      <span>{member.qualification}</span>
                    </div>
                    <div className="detail-item">
                      <span className="experience-badge">{member.experience} Experience</span>
                    </div>
                    <div className="detail-item">
                      <Mail size={16} />
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section join-section">
        <div className="container">
          <div className="join-card">
            <h2>Join Our Teaching Team</h2>
            <p>We're always looking for passionate educators to join our family</p>
            <a href="/contact" className="btn btn-primary">Apply Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
