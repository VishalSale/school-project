import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Initialize data from localStorage or use defaults
  const getInitialData = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  // Admissions Data
  const [admissionsData, setAdmissionsData] = useState(() =>
    getInitialData('admissionsData', {
      importantDates: [
        { id: 1, label: 'Application Start', date: '2025-01-01' },
        { id: 2, label: 'Application Deadline', date: '2025-03-31' },
        { id: 3, label: 'Entrance Test', date: '2025-04-15' },
        { id: 4, label: 'Results', date: '2025-04-30' },
        { id: 5, label: 'Session Begins', date: '2025-07-01' }
      ],
      requiredDocuments: [
        { id: 1, name: 'Birth Certificate (Original & Copy)' },
        { id: 2, name: 'Transfer Certificate (if applicable)' },
        { id: 3, name: 'Previous School Report Card' },
        { id: 4, name: 'Passport Size Photographs (4 copies)' },
        { id: 5, name: 'Address Proof' },
        { id: 6, name: 'Parent ID Proof' }
      ]
    })
  );

  // Academics Data
  const [academicsData, setAcademicsData] = useState(() =>
    getInitialData('academicsData', {
      curriculum: [
        {
          id: 1,
          title: 'Languages',
          subjects: ['English', 'Hindi', 'Sanskrit'],
          description: 'Strong foundation in language skills and literature',
          icon: 'BookOpen'
        },
        {
          id: 2,
          title: 'Mathematics',
          subjects: ['Algebra', 'Geometry', 'Statistics'],
          description: 'Comprehensive mathematical concepts and problem-solving',
          icon: 'Calculator'
        },
        {
          id: 3,
          title: 'Sciences',
          subjects: ['Physics', 'Chemistry', 'Biology'],
          description: 'Hands-on learning with modern laboratory facilities',
          icon: 'Beaker'
        },
        {
          id: 4,
          title: 'Social Studies',
          subjects: ['History', 'Geography', 'Civics'],
          description: 'Understanding society, culture, and global awareness',
          icon: 'Globe'
        },
        {
          id: 5,
          title: 'Arts & Crafts',
          subjects: ['Drawing', 'Painting', 'Sculpture'],
          description: 'Creative expression and artistic development',
          icon: 'Palette'
        },
        {
          id: 6,
          title: 'Music & Dance',
          subjects: ['Vocal', 'Instrumental', 'Classical Dance'],
          description: 'Cultural enrichment through performing arts',
          icon: 'Music'
        }
      ],
      classStructure: [
        { id: 1, level: 'Primary', grades: 'Classes 1-5', focus: 'Foundation building with activity-based learning' },
        { id: 2, level: 'Middle School', grades: 'Classes 6-8', focus: 'Conceptual understanding and skill development' },
        { id: 3, level: 'Secondary', grades: 'Classes 9-10', focus: 'Board exam preparation with CBSE curriculum' },
        { id: 4, level: 'Senior Secondary', grades: 'Classes 11-12', focus: 'Stream specialization (Science, Commerce, Arts)' }
      ],
      additionalPrograms: [
        { id: 1, title: 'Sports & Physical Education', description: 'Cricket, Football, Basketball, Athletics, Yoga, and more' },
        { id: 2, title: 'Computer Education', description: 'Coding, Robotics, AI basics, and Digital Literacy' },
        { id: 3, title: 'Life Skills', description: 'Communication, Leadership, Critical Thinking, and Problem Solving' },
        { id: 4, title: 'Co-curricular Activities', description: 'Debates, Quiz, Drama, Science Club, and Cultural Events' }
      ]
    })
  );

  // Faculty Data
  const [facultyData, setFacultyData] = useState(() =>
    getInitialData('facultyData', [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        position: 'Principal',
        qualification: 'Ph.D. in Education',
        experience: '25 years',
        email: 'principal@brightfuture.edu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s'
      },
      {
        id: 2,
        name: 'Mr. Rajesh Kumar',
        position: 'Vice Principal',
        qualification: 'M.Ed., M.A.',
        experience: '20 years',
        email: 'vp@brightfuture.edu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s'
      },
      {
        id: 3,
        name: 'Ms. Priya Sharma',
        position: 'Mathematics Teacher',
        qualification: 'M.Sc. Mathematics',
        experience: '15 years',
        email: 'priya@brightfuture.edu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s'
      },
      {
        id: 4,
        name: 'Mr. David Wilson',
        position: 'Science Teacher',
        qualification: 'M.Sc. Physics',
        experience: '12 years',
        email: 'david@brightfuture.edu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s'
      },
      {
        id: 5,
        name: 'Ms. Anjali Verma',
        position: 'English Teacher',
        qualification: 'M.A. English',
        experience: '10 years',
        email: 'anjali@brightfuture.edu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s'
      },
      {
        id: 6,
        name: 'Mr. Michael Brown',
        position: 'Computer Science Teacher',
        qualification: 'M.Tech. CS',
        experience: '8 years',
        email: 'michael@brightfuture.edu',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s'
      }
    ])
  );

  // Gallery Data
  const [galleryData, setGalleryData] = useState(() =>
    getInitialData('galleryData', [
      { id: 1, category: 'events', title: 'Annual Day Celebration', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-15' },
      { id: 2, category: 'sports', title: 'Sports Day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-10' },
      { id: 3, category: 'academics', title: 'Science Lab', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-05' },
      { id: 4, category: 'infrastructure', title: 'School Building', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-01' },
      { id: 5, category: 'events', title: 'Cultural Program', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-12' },
      { id: 6, category: 'sports', title: 'Basketball Tournament', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-08' },
      { id: 7, category: 'academics', title: 'Computer Lab', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2025-01-03' },
      { id: 8, category: 'infrastructure', title: 'Library', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2024-12-28' },
      { id: 9, category: 'events', title: 'Independence Day', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2024-08-15' },
      { id: 10, category: 'sports', title: 'Cricket Match', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2024-12-20' },
      { id: 11, category: 'academics', title: 'Classroom', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2024-12-15' },
      { id: 12, category: 'infrastructure', title: 'Playground', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s', date: '2024-12-10' }
    ])
  );

  // Announcements Data
  const [announcementsData, setAnnouncementsData] = useState(() =>
    getInitialData('announcementsData', [
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
      },
      {
        id: 6,
        title: 'New Library Books Available',
        date: '2025-01-15',
        category: 'Academic',
        isPinned: false,
        content: 'Over 500 new books have been added to the school library. Students can issue books from January 20, 2025.'
      },
      {
        id: 7,
        title: 'School Picnic Announcement',
        date: '2025-01-10',
        category: 'Event',
        isPinned: false,
        content: 'Annual school picnic for classes 1-8 will be held on March 15, 2025. Consent forms to be submitted by March 1.'
      },
      {
        id: 8,
        title: 'Fee Payment Reminder',
        date: '2025-01-05',
        category: 'Academic',
        isPinned: false,
        content: 'Last date for fee payment for the current quarter is January 31, 2025. Late fee will be applicable after the due date.'
      }
    ])
  );

  // Blog/News Data
  const [blogData, setBlogData] = useState(() =>
    getInitialData('blogData', [
      {
        id: 1,
        title: 'Students Excel in National Science Olympiad',
        category: 'Achievements',
        date: '2025-01-20',
        author: 'Admin',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s',
        excerpt: 'Our students brought home 5 gold medals and 8 silver medals from the National Science Olympiad.',
        content: 'We are proud to announce that our students have excelled in the National Science Olympiad held in New Delhi. The team of 15 students participated in various categories including Physics, Chemistry, Biology, and Mathematics. Their dedication, hard work, and innovative thinking led them to secure top positions. Special congratulations to Rahul Sharma (Class 10) who won the Best Overall Performance award. This achievement reflects the quality of science education and the commitment of our faculty members.',
        published: true
      },
      {
        id: 2,
        title: 'Annual Cultural Fest - A Grand Success',
        category: 'Events',
        date: '2025-01-15',
        author: 'Admin',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s',
        excerpt: 'The annual cultural fest showcased incredible talent from students across all grades.',
        content: 'Our annual cultural fest was a spectacular display of talent, creativity, and enthusiasm. Students performed various cultural programs including dance, music, drama, and art exhibitions. The three-day event witnessed participation from over 500 students. The highlight was the fusion dance performance and the theatrical adaptation of a classic play. Parents and guests were thoroughly impressed by the level of talent and organization.',
        published: true
      },
      {
        id: 3,
        title: 'New Computer Lab Inaugurated',
        category: 'Updates',
        date: '2025-01-10',
        author: 'Admin',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBQ8D6rAl5rW__Xb4YWGHnl0p6TRSeplLJw&s',
        excerpt: 'State-of-the-art computer lab with 50 workstations now open for students.',
        content: 'We are excited to announce the inauguration of our new state-of-the-art computer lab equipped with 50 high-performance workstations, smart boards, and the latest software. The lab will enable students to learn coding, robotics, AI, and other cutting-edge technologies. This facility is part of our commitment to providing world-class infrastructure and preparing students for the digital future.',
        published: true
      }
    ])
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('admissionsData', JSON.stringify(admissionsData));
  }, [admissionsData]);

  useEffect(() => {
    localStorage.setItem('academicsData', JSON.stringify(academicsData));
  }, [academicsData]);

  useEffect(() => {
    localStorage.setItem('facultyData', JSON.stringify(facultyData));
  }, [facultyData]);

  useEffect(() => {
    localStorage.setItem('galleryData', JSON.stringify(galleryData));
  }, [galleryData]);

  useEffect(() => {
    localStorage.setItem('announcementsData', JSON.stringify(announcementsData));
  }, [announcementsData]);

  useEffect(() => {
    localStorage.setItem('blogData', JSON.stringify(blogData));
  }, [blogData]);

  // CBSE Disclosure Data
  const [cbseData, setCbseData] = useState(() =>
    getInitialData('cbseData', {
      generalInfo: {
        schoolName: 'Bright Future School',
        affiliationNo: '1234567',
        schoolCode: '12345',
        address: '123 Education Street, City, State - 12345',
        principalName: 'Dr. Sarah Johnson',
        principalQualification: 'Ph.D. in Education',
        email: 'principal@brightfuture.edu',
        contactNumber: '+91 123 456 7890',
        campusArea: '5 Acres'
      },
      staffDetails: {
        totalTeaching: '100',
        pgt: '25',
        tgt: '40',
        prt: '35',
        nonTeaching: '50'
      },
      feeStructure: {
        class1to5: '50000',
        class6to8: '60000',
        class9to10: '70000',
        class11to12: '80000'
      },
      documents: [
        { id: 1, name: 'CBSE Affiliation Certificate', url: '#' },
        { id: 2, name: 'Society Registration Certificate', url: '#' },
        { id: 3, name: 'No Objection Certificate (NOC)', url: '#' },
        { id: 4, name: 'Recognition Certificate', url: '#' },
        { id: 5, name: 'Building Safety Certificate', url: '#' },
        { id: 6, name: 'Fire Safety Certificate', url: '#' },
        { id: 7, name: 'DEO Certificate', url: '#' },
        { id: 8, name: 'Annual Report', url: '#' }
      ],
      infrastructure: [
        { id: 1, item: 'Number of Classrooms', value: '60' },
        { id: 2, item: 'Science Labs', value: '5' },
        { id: 3, item: 'Computer Labs', value: '3' },
        { id: 4, item: 'Library', value: 'Yes (10,000+ books)' },
        { id: 5, item: 'Playground', value: 'Yes' },
        { id: 6, item: 'Sports Facilities', value: 'Cricket, Football, Basketball' },
        { id: 7, item: 'Medical Room', value: 'Yes' },
        { id: 8, item: 'Auditorium', value: 'Yes (500 capacity)' },
        { id: 9, item: 'Transport', value: 'Yes (20 buses)' }
      ]
    })
  );

  useEffect(() => {
    localStorage.setItem('cbseData', JSON.stringify(cbseData));
  }, [cbseData]);

  const value = {
    // Admissions
    admissionsData,
    setAdmissionsData,
    
    // Academics
    academicsData,
    setAcademicsData,
    
    // Faculty
    facultyData,
    setFacultyData,
    
    // Gallery
    galleryData,
    setGalleryData,
    
    // Announcements
    announcementsData,
    setAnnouncementsData,
    
    // Blog
    blogData,
    setBlogData,
    
    // CBSE Disclosure
    cbseData,
    setCbseData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
