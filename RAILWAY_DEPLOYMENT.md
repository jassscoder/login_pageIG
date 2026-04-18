# Railway Deployment Guide

Your Instagram Login Clone is now ready to be deployed to Railway! Follow these steps to get your app live.

## Prerequisites

1. **Railway Account** - Sign up at [railway.app](https://railway.app)
2. **GitHub Account** - Your code is already on GitHub
3. **Backend Environment Variables** - Know what values you need

## Step-by-Step Deployment

### Step 1: Connect GitHub to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Create New Project"**
3. Select **"Deploy from GitHub"**
4. Authorize Railway to access your GitHub account
5. Select the `login_pageIG` repository
6. Railway will automatically detect it's a Node.js project

### Step 2: Set Environment Variables

After Railway creates the project, go to **Variables** and add:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=instagram_login
JWT_SECRET=your_strong_random_secret_key_here
NODE_ENV=production
```

**For JWT_SECRET**, generate a random string (example):
```
openssl rand -base64 32
```
Or just use a long random string like: `sk-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

### Step 3: Add MySQL Database

1. In your Railway project, click **"Add Services"**
2. Select **"MySQL"**
3. Railway will automatically add it and provide connection details
4. Note the variables:
   - `MYSQLHOST` → Use as `DB_HOST`
   - `MYSQLUSER` → Use as `DB_USER`  
   - `MYSQLPASSWORD` → Use as `DB_PASSWORD`
   - `MYSQLDATABASE` → Use as `DB_NAME`

### Step 4: Deploy Database Schema

The database needs to be initialized with your schema:

1. Copy content from `database/schema.sql`
2. Use MySQL CLI or Railway's database tool to run it:
   ```sql
   -- Run the SQL commands from schema.sql
   ```

### Step 5: Frontend Setup

Since your frontend is static HTML, you have options:

**Option A: Deploy Frontend Separately (Recommended)**
- Use Railway's Static Site service
- Or use Vercel/Netlify (free)
- Update `API_URL` in `frontend/script.js` to point to your Railway backend

**Option B: Serve Frontend from Backend**
- Add static file serving to `server.js`:
```javascript
app.use(express.static('./frontend'));
```
- Make sure `frontend/` folder is in your Git repo
- Update frontend script.js API URL pointing to same domain

**Option C: Update Hardcoded URLs for Railway**
Edit `frontend/script.js` and change the fallback API URL:
```javascript
const getBackendURL = () => {
    if (window.location.hostname === 'localhost') {
        return 'http://localhost:5000/api';
    }
    // Your Railway backend URL
    return 'https://your-backend-url.railway.app/api';
};
```

### Step 6: Deploy

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Update for Railway deployment"
   git push origin main
   ```

2. Railway auto-deploys on every push to `main`

3. View your app at the provided Railway URL (e.g., `https://instagram-login-clone-production.up.railway.app`)

## Environment Variables Reference

| Variable | Example | Required |
|----------|---------|----------|
| `DB_HOST` | `localhost` | Yes |
| `DB_USER` | `root` | Yes |
| `DB_PASSWORD` | `password123` | Yes |
| `DB_NAME` | `instagram_login` | Yes |
| `JWT_SECRET` | `sk-1a2b3c...` | Yes |
| `NODE_ENV` | `production` | No (defaults to development) |
| `PORT` | `5000` | No (Railway sets this) |

## Troubleshooting

### Database Connection Error
- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD` in Railway Variables
- Make sure MySQL service is running
- Check database schema was imported

### "Cannot find module" Error
- Run: `npm install` locally first
- Commit `package-lock.json`
- Railway will install dependencies automatically

### Frontend Can't Connect to Backend
- Check API_URL in `frontend/script.js`
- Make sure CORS is enabled in backend
- Verify backend service is running

### Port Issues
- Railway assigns a dynamic PORT via environment variable
- Your `server.js` uses `process.env.PORT` ✓ Already configured!

## Monitoring

1. Go to your Railway project dashboard
2. View **Logs** to debug issues
3. Check **Metrics** for performance
4. Monitor **Deployments** for history

## Next Steps

- ✅ Backend running
- ✅ Database configured  
- ⏳ Frontend deployed (choose your option above)
- 📝 Update README with your live URL
- 🔒 Set strong `JWT_SECRET`
- 📊 Monitor your app logs

## Support

For Railway issues: [Railway Docs](https://docs.railway.app)

Happy deploying! 🚀
