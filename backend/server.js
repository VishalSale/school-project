require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { errorHandler, notFound } = require('./src/middleware/errorHandler');
const { addAuditFields } = require('./src/middleware/auditMiddleware');

// Import routes
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const facultyRoutes = require('./src/routes/faculty');
const galleryRoutes = require('./src/routes/gallery');
const announcementsRoutes = require('./src/routes/announcements');
const admissionsRoutes = require('./src/routes/admissions');
const academicsRoutes = require('./src/routes/academics');
const cbseRoutes = require('./src/routes/cbse');
const contactRoutes = require('./src/routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add audit fields middleware (before routes)
app.use('/api', addAuditFields);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/academics', academicsRoutes);
app.use('/api/cbse', cbseRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;
