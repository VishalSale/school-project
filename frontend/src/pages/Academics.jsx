import { BookOpen, Beaker, Calculator, Globe, Palette, Music } from 'lucide-react';
import './Academics.css';

const Academics = () => {
  const curriculum = [
    {
      icon: <BookOpen size={40} />,
      title: 'Languages',
      subjects: ['English', 'Hindi', 'Sanskrit'],
      description: 'Strong foundation in language skills and literature'
    },
    {
      icon: <Calculator size={40} />,
      title: 'Mathematics',
      subjects: ['Algebra', 'Geometry', 'Statistics'],
      description: 'Comprehensive mathematical concepts and problem-solving'
    },
    {
      icon: <Beaker size={40} />,
      title: 'Sciences',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      description: 'Hands-on learning with modern laboratory facilities'
    },
    {
      icon: <Globe size={40} />,
      title: 'Social Studies',
      subjects: ['History', 'Geography', 'Civics'],
      description: 'Understanding society, culture, and global awareness'
    },
    {
      icon: <Palette size={40} />,
      title: 'Arts & Crafts',
      subjects: ['Drawing', 'Painting', 'Sculpture'],
      description: 'Creative expression and artistic development'
    },
    {
      icon: <Music size={40} />,
      title: 'Music & Dance',
      subjects: ['Vocal', 'Instrumental', 'Classical Dance'],
      description: 'Cultural enrichment through performing arts'
    }
  ];

  const classes = [
    { level: 'Primary', grades: 'Classes 1-5', focus: 'Foundation building with activity-based learning' },
    { level: 'Middle School', grades: 'Classes 6-8', focus: 'Conceptual understanding and skill development' },
    { level: 'Secondary', grades: 'Classes 9-10', focus: 'Board exam preparation with CBSE curriculum' },
    { level: 'Senior Secondary', grades: 'Classes 11-12', focus: 'Stream specialization (Science, Commerce, Arts)' }
  ];

  return (
    <div className="academics-page">
      <section className="page-header">
        <div className="container">
          <h1>Academics</h1>
          <p>Excellence in education through comprehensive curriculum</p>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Curriculum</h2>
            <p>CBSE-affiliated comprehensive education program</p>
          </div>
          <div className="grid grid-3">
            {curriculum.map((item, index) => (
              <div key={index} className="card curriculum-card">
                <div className="curriculum-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <div className="subjects">
                  {item.subjects.map((subject, idx) => (
                    <span key={idx} className="subject-tag">{subject}</span>
                  ))}
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Structure */}
      <section className="section class-structure-section">
        <div className="container">
          <div className="section-title">
            <h2>Class Structure</h2>
            <p>Age-appropriate learning at every level</p>
          </div>
          <div className="grid grid-2">
            {classes.map((classInfo, index) => (
              <div key={index} className="class-card">
                <h3>{classInfo.level}</h3>
                <div className="grade-badge">{classInfo.grades}</div>
                <p>{classInfo.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Programs */}
      <section className="section programs-section">
        <div className="container">
          <div className="section-title">
            <h2>Additional Programs</h2>
            <p>Beyond academics - holistic development</p>
          </div>
          <div className="programs-grid">
            <div className="program-card">
              <h3>Sports & Physical Education</h3>
              <p>Cricket, Football, Basketball, Athletics, Yoga, and more</p>
            </div>
            <div className="program-card">
              <h3>Computer Education</h3>
              <p>Coding, Robotics, AI basics, and Digital Literacy</p>
            </div>
            <div className="program-card">
              <h3>Life Skills</h3>
              <p>Communication, Leadership, Critical Thinking, and Problem Solving</p>
            </div>
            <div className="program-card">
              <h3>Co-curricular Activities</h3>
              <p>Debates, Quiz, Drama, Science Club, and Cultural Events</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
