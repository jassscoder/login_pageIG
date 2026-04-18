# Instagram Login Clone

A modern, full-stack Instagram-inspired login system built with Node.js, Express, MySQL, and vanilla JavaScript. Features dark mode toggle, form validation, and JWT authentication.

## Features

✨ **Frontend**
- Clean, minimalist design matching Instagram's aesthetic
- Dark mode / Light mode toggle with localStorage persistence
- Form validation with real-time error messages
- Responsive design
- Password visibility toggle
- Modal-based signup interface

🔐 **Backend**
- Express.js REST API
- MySQL database integration
- JWT token-based authentication
- User registration and login
- Password hashing with bcryptjs
- CORS enabled for frontend communication
- Error handling middleware

## Project Structure

```
├── backend/
│   ├── config.js              # Database configuration
│   ├── server.js              # Express server entry point
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   ├── controllers/
│   │   └── authController.js  # Auth logic (login, register)
│   ├── routes/
│   │   └── auth.js            # Auth API routes
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   └── user.js            # User model
│   └── node_modules/          # Dependencies
│
├── frontend/
│   ├── index.html             # Main page
│   ├── script.js              # Frontend logic & dark mode
│   ├── styles.css             # Styling with CSS variables
│   ├── .env.example           # Frontend config template
│   └── image/                 # Assets
│
├── database/
│   └── schema.sql             # MySQL database schema
│
├── .gitignore                 # Git ignore rules
├── .env.example               # Environment template
└── RAILWAY_DEPLOYMENT.md      # Railway deployment guide
```

## Quick Start (Local Development)

### Prerequisites
- Node.js 14+ and npm
- MySQL running (via XAMPP, Docker, or native install)
- Git

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=instagram_login
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. **Initialize database**
   ```bash
   mysql -u root < ../database/schema.sql
   ```

5. **Start backend server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Open frontend**
   - Simply open `frontend/index.html` in your browser
   - Or use a local server:
     ```bash
     cd frontend
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

2. **The frontend automatically detects the backend URL**
   - Local: `http://localhost:5000/api`
   - Production: Configurable in `script.js`

## API Endpoints

### Authentication Routes

**POST** `/api/auth/register`
- Register new user
- Body: `{ email, username, fullName, password }`

**POST** `/api/auth/login`
- Login user
- Body: `{ email, password }`
- Returns: `{ token, user }`

**GET** `/api/auth/me`
- Get current user (requires JWT token)
- Header: `Authorization: Bearer <token>`

**POST** `/api/auth/logout`
- Logout (requires JWT token)

## Database Schema

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=instagram_login
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=5000
```

### Frontend (hardcoded in script.js)
```javascript
const API_URL = 'http://localhost:5000/api'; // for local
// Change to your production URL for deployment
```

## Technologies Used

**Backend:**
- Express.js - Web framework
- MySQL2 - Database driver
- bcryptjs - Password hashing
- jsonwebtoken - JWT tokens
- dotenv - Environment variables
- CORS - Cross-origin requests

**Frontend:**
- Vanilla HTML5
- CSS3 with CSS Variables
- Vanilla JavaScript (no frameworks)

## Dark Mode Implementation

The dark mode feature uses:
- **CSS Variables** for theme switching
- **localStorage** for persistence
- **DOMContentLoaded** to ensure DOM is ready
- **Class toggles** on body element to apply themes

```javascript
// Light mode (default)
:root { --bg-primary: #ffffff; ... }

// Dark mode
body.dark-mode { --bg-primary: #121212; ... }
```

## Deployment

### Deploy to Railway (Recommended)

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete instructions.

Quick steps:
1. Connect GitHub repo to Railway
2. Add MySQL service
3. Set environment variables
4. Deploy (automatic on git push)

**Live URL:** Your app will appear at `https://your-app.railway.app`

## Development vs Production

### Local Development
```
Backend: http://localhost:5000
Frontend: http://localhost:8000
Environment: development
```

### Production (Railway)
```
Backend: https://your-backend.railway.app
Frontend: https://your-frontend.railway.app
Environment: production
Database: Railway MySQL
```

## Security Considerations

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ SQL prepared statements (prevents injection)
- ⚠️ HTTPS should be enabled in production
- ⚠️ Token refresh mechanism recommended for production
- ⚠️ Rate limiting recommended for login endpoint

## Testing the App

1. **Register a new user**
   - Fill in email, username, password
   - Click "Sign up"

2. **Login**
   - Enter registered email and password
   - Click "Log in"

3. **Toggle Dark Mode**
   - Click sun/moon icon in top right
   - Theme persists across sessions

4. **Password Visibility**
   - Click eye icon to show/hide password

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to database" | Check DB credentials in `.env` |
| "Port 5000 already in use" | Change port in `server.js` or kill existing process |
| "Dark mode not working" | Clear browser cache or refresh with Ctrl+Shift+R |
| "Frontend can't reach backend" | Check API_URL in `frontend/script.js` |
| "MySQL schema not loaded" | Run `mysql -u root < database/schema.sql` |

## File Sizes & Performance

- Frontend total: ~50KB (HTML + CSS + JS)
- No external CDN dependencies
- Fast load times
- Optimized for mobile & desktop

## Future Enhancements

- [ ] Email verification for signup
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] User profile page
- [ ] Avatar upload
- [ ] Follow/unfollow system
- [ ] Feed implementation
- [ ] Real-time notifications

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ using Node.js + MySQL + Vanilla JavaScript

---

**Questions or Issues?**
- Check [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for deployment help
- Review the code comments for implementation details
- Test locally first before deploying

**Live Demo:** (Add your Railway URL here once deployed)

**GitHub:** [jassscoder/login_pageIG](https://github.com/jassscoder/login_pageIG)
