# 🏫 School Website Frontend

A modern, responsive school website built with React and Vite. Works perfectly with or without a backend!

## ✨ Features

- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📊 Admin dashboard for content management
- 💾 Works offline with localStorage
- 🚀 Fast and optimized
- 🔒 Secure authentication
- 📸 Gallery management
- 📢 Announcements system
- 📝 Blog/News section
- 📋 CBSE disclosure page

## 🚀 Quick Start

### Development Mode (with backend)

```bash
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Production Mode (without backend)

```bash
npm install
npm run build
npm run preview
```

Visit: `http://localhost:4173`

## 📦 Deploy to GitHub Pages

### Option 1: Using Deploy Script (Easiest)

**Windows:**
```bash
deploy.bat
```

**Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deploy

```bash
npm run build
npm run deploy
```

Your site will be live at: `https://VishalSale.github.io/school-project`

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_STATIC_MODE=false
VITE_API_URL=http://localhost:3000/api
VITE_SITE_NAME=Your School Name
VITE_SITE_EMAIL=school@example.com
VITE_SITE_PHONE=1234567890
```

For production (`.env.production`):
```env
VITE_STATIC_MODE=true
VITE_SITE_NAME=Your School Name
VITE_SITE_EMAIL=school@example.com
VITE_SITE_PHONE=1234567890
```

## 🎯 Static Mode vs Backend Mode

### Static Mode (Default for Production)
- ✅ No backend required
- ✅ Works on GitHub Pages
- ✅ Data stored in localStorage
- ✅ Perfect for demo/testing
- ❌ No real authentication
- ❌ No file uploads to server
- ❌ No email notifications

### Backend Mode (Development)
- ✅ Real authentication
- ✅ Database integration
- ✅ File uploads
- ✅ Email notifications
- ✅ Multi-user support
- ❌ Requires backend server

## 🔐 Demo Admin Access

For testing admin features:

```
Email: admin@school.com
Password: admin123
```

## 📁 Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── context/     # React context (state management)
│   ├── services/    # API services
│   ├── utils/       # Utility functions
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── .env             # Development environment variables
├── .env.production  # Production environment variables
└── vite.config.js   # Vite configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## 📚 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons
- **CSS3** - Styling

## 🐛 Troubleshooting

### App crashes on GitHub Pages

**Solution:** Make sure `.env.production` has `VITE_STATIC_MODE=true`

### Blank page after deploy

**Solution:** Check `vite.config.js` base path matches your repo name

### 404 on page refresh

**Solution:** Already handled with HashRouter!

### Changes not showing

**Solution:** Clear browser cache (Ctrl + Shift + Delete)

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [API Documentation](../backend/API_ENDPOINTS.md) - Backend API reference

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Open an issue on GitHub
- Contact: vishalsale802@gmail.com

---

**Made with ❤️ for education**
