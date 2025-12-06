# School Website Backend API

Complete RESTful API for School Website built with Node.js, Express, PostgreSQL, and Knex.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create PostgreSQL database**
```bash
createdb school_website
```

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=school_website
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173
```

5. **Run migrations and seeds**
```bash
npm run db:setup
```

This will:
- Create all database tables
- Insert initial data (admin user, CBSE info)

6. **Start the server**
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "admin@school.com",
      "role": "admin"
    }
  }
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

---

## 📝 Blog Endpoints

### Get All Blog Posts
```http
GET /api/blog
GET /api/blog?published=true  # Only published posts
```

### Get Single Blog Post
```http
GET /api/blog/:id
```

### Create Blog Post (Admin)
```http
POST /api/blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "School Annual Day 2024",
  "category": "Events",
  "date": "2024-12-15",
  "author": "Admin",
  "image": "base64_or_url",
  "excerpt": "Short description",
  "content": "Full content here",
  "published": true
}
```

### Update Blog Post (Admin)
```http
PUT /api/blog/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

### Delete Blog Post (Admin)
```http
DELETE /api/blog/:id
Authorization: Bearer <token>
```

### Toggle Publish Status (Admin)
```http
PATCH /api/blog/:id/toggle-publish
Authorization: Bearer <token>
```

---

## 👥 Faculty Endpoints

### Get All Faculty
```http
GET /api/faculty
```

### Get Single Faculty Member
```http
GET /api/faculty/:id
```

### Create Faculty Member (Admin)
```http
POST /api/faculty
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dr. John Doe",
  "position": "Principal",
  "qualification": "Ph.D. in Education",
  "experience": "20 years",
  "email": "john@school.com",
  "image": "base64_or_url"
}
```

### Update Faculty Member (Admin)
```http
PUT /api/faculty/:id
Authorization: Bearer <token>
```

### Delete Faculty Member (Admin)
```http
DELETE /api/faculty/:id
Authorization: Bearer <token>
```

---

## 🖼️ Gallery Endpoints

### Get All Images
```http
GET /api/gallery
GET /api/gallery?category=events  # Filter by category
```

### Get Single Image
```http
GET /api/gallery/:id
```

### Create Image (Admin)
```http
POST /api/gallery
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "events",
  "title": "Annual Day",
  "url": "base64_or_url",
  "date": "2024-12-15"
}
```

### Update Image (Admin)
```http
PUT /api/gallery/:id
Authorization: Bearer <token>
```

### Delete Image (Admin)
```http
DELETE /api/gallery/:id
Authorization: Bearer <token>
```

---

## 📢 Announcements Endpoints

### Get All Announcements
```http
GET /api/announcements
```

### Get Single Announcement
```http
GET /api/announcements/:id
```

### Create Announcement (Admin)
```http
POST /api/announcements
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Holiday Notice",
  "date": "2024-12-25",
  "category": "Holiday",
  "is_pinned": true,
  "content": "School will remain closed..."
}
```

### Update Announcement (Admin)
```http
PUT /api/announcements/:id
Authorization: Bearer <token>
```

### Delete Announcement (Admin)
```http
DELETE /api/announcements/:id
Authorization: Bearer <token>
```

### Toggle Pin Status (Admin)
```http
PATCH /api/announcements/:id/toggle-pin
Authorization: Bearer <token>
```

---

## 🗄️ Database Schema

### Users Table
```sql
- id (PK)
- email (unique)
- password (hashed)
- role
- created_at
- updated_at
```

### Blog Table
```sql
- id (PK)
- title
- category
- date
- author
- image (text/base64)
- excerpt
- content
- published (boolean)
- created_at
- updated_at
```

### Faculty Table
```sql
- id (PK)
- name
- position
- qualification
- experience
- email
- image (text/base64)
- created_at
- updated_at
```

### Gallery Table
```sql
- id (PK)
- category
- title
- url (text/base64)
- date
- created_at
- updated_at
```

### Announcements Table
```sql
- id (PK)
- title
- date
- category
- is_pinned (boolean)
- content
- created_at
- updated_at
```

---

## 🛠️ Available Scripts

```bash
# Start server
npm start

# Start with nodemon (development)
npm run dev

# Run migrations
npm run migrate:latest

# Rollback migrations
npm run migrate:rollback

# Run seeds
npm run seed:run

# Setup database (migrate + seed)
npm run db:setup
```

---

## 🔧 Database Commands

### Create new migration
```bash
npx knex migrate:make migration_name
```

### Create new seed
```bash
npx knex seed:make seed_name
```

### Check migration status
```bash
npx knex migrate:status
```

---

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password hashing with bcrypt
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation with express-validator
- ✅ SQL injection prevention (Knex parameterized queries)
- ✅ XSS protection

---

## 📦 Dependencies

### Core
- **express**: Web framework
- **pg**: PostgreSQL client
- **knex**: SQL query builder
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Input validation

### Security
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **express-rate-limit**: Rate limiting

### Utilities
- **dotenv**: Environment variables
- **morgan**: HTTP request logger
- **multer**: File upload handling

---

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
DB_HOST=your_production_db_host
DB_NAME=your_production_db_name
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_very_secure_secret_key
CORS_ORIGIN=https://yourschool.com
```

### Deployment Platforms
- **Heroku**: Easy deployment with PostgreSQL addon
- **Railway**: Modern platform with PostgreSQL
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2 + RDS
- **Render**: Free tier available

---

## 🧪 Testing

### Test with cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@school.com","password":"password123"}'
```

**Get Blog Posts:**
```bash
curl http://localhost:5000/api/blog
```

**Create Blog Post:**
```bash
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","category":"Events","date":"2024-12-15","author":"Admin","excerpt":"Test","content":"Test content","published":true}'
```

---

## 📝 Default Credentials

After running seeds:
- **Email**: admin@school.com
- **Password**: password123

**⚠️ Change these credentials in production!**

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check database exists
psql -l

# Create database if missing
createdb school_website
```

### Migration Errors
```bash
# Rollback and re-run
npm run migrate:rollback
npm run migrate:latest
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Knex.js Documentation](http://knexjs.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

---

## 🤝 Support

For issues or questions:
1. Check the API documentation above
2. Review error messages in console
3. Check database connection
4. Verify environment variables

---

## ✅ Checklist for Production

- [ ] Change JWT_SECRET to a strong random string
- [ ] Change default admin password
- [ ] Set NODE_ENV=production
- [ ] Configure production database
- [ ] Set up SSL/HTTPS
- [ ] Configure proper CORS_ORIGIN
- [ ] Set up database backups
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Review rate limiting settings
- [ ] Test all endpoints
- [ ] Set up CI/CD pipeline

---

**Backend is ready! Connect it to your frontend and you're good to go! 🚀**
