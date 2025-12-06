import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Academics from './pages/Academics';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Announcements from './pages/Announcements';
import CBSEDisclosure from './pages/CBSEDisclosure';
import Blog from './pages/Blog';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/cbse-disclosure" element={<CBSEDisclosure />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
