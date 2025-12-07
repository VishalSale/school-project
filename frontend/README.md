# Bright Future School Website

A modern, responsive school website built with React, featuring admin dashboard, online admissions, announcements, and more.

## Features

### Public Pages
- **Home**: Hero section, stats, features, and quick links
- **About Us**: Mission, vision, history, and core values
- **Admissions**: Online admission form with process details
- **Academics**: Curriculum, class structure, and programs
- **Faculty**: Staff profiles and qualifications
- **Gallery**: Image gallery with category filters
- **Contact**: Contact form with location map
- **Announcements**: Latest school notices and events
- **CBSE Disclosure**: Mandatory disclosure information

### Admin Features
- **Login System**: Secure authentication
- **Admin Dashboard**: Manage announcements and news
- **Content Management**: Create, edit, and delete posts

## Tech Stack

- **React 19** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **CSS3** - Styling (fully responsive)

## Installation

1. **Install dependencies:**
   ```bash
   cd school-website
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Backend Integration

### API Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Required API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

#### Admissions
- `POST /api/admissions` - Submit admission form
- `GET /api/admissions` - Get all admissions (admin)
- `GET /api/admissions/:id` - Get single admission
- `PUT /api/admissions/:id` - Update admission
- `DELETE /api/admissions/:id` - Delete admission

#### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (admin)
- `PUT /api/announcements/:id` - Update announcement (admin)
- `DELETE /api/announcements/:id` - Delete announcement (admin)

#### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)

#### News
- `GET /api/news` - Get all news
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)

#### Gallery
- `GET /api/gallery` - Get all images
- `POST /api/gallery` - Upload image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Example API Response Format

```javascript
// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=Bright Future School
```

## Customization

### Branding
1. Update school name in `src/components/common/Header.jsx`
2. Update colors in `src/index.css` (CSS variables)
3. Replace placeholder images with actual school photos

### Colors
Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #2563eb;    /* Blue */
  --secondary-color: #10b981;  /* Green */
  --dark-color: #1e293b;       /* Dark Gray */
  --light-color: #f8fafc;      /* Light Gray */
  --text-color: #334155;       /* Text Gray */
}
```

### Content
- Update school information in respective page components
- Modify form fields as needed
- Add/remove navigation links in `Header.jsx`

## Project Structure

```
school-website/
├── public/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Header.jsx
│   │       ├── Header.css
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Admissions.jsx
│   │   ├── Academics.jsx
│   │   ├── Faculty.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   ├── Announcements.jsx
│   │   ├── CBSEDisclosure.jsx
│   │   ├── Login.jsx
│   │   └── AdminDashboard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## Demo Credentials

For testing the admin panel:
- **Email**: admin@school.com
- **Password**: password123

## Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use for your school project

## Support

For issues or questions, contact: support@brightfuture.edu

---

Built with ❤️ for education
