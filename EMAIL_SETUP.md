# Email and Database Setup Guide

This guide will help you set up Gmail SMTP email sending and MongoDB database storage for your portfolio contact form.

## 🚀 Quick Setup

1. **Install Dependencies** (already done):
   ```bash
   npm install nodemailer mongodb @types/nodemailer
   ```

2. **Set up Environment Variables**:
   Create a `.env.local` file in your project root with the following variables:

   ```env
   # Gmail SMTP Configuration
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB=portfolio
   MONGODB_COLLECTION=contact_submissions

   # Alternative MongoDB Atlas URI (if using cloud MongoDB)
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

   # Admin API (optional)
   ADMIN_SECRET=your-secure-admin-secret

   # Next.js Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Set up MongoDB**:
   ```bash
   npm run setup-db
   ```

## 📧 Gmail SMTP Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Follow the setup process

### Step 2: Generate App Password
1. In Google Account settings, go to **Security**
2. Under "2-Step Verification", click **App passwords**
3. Select **Mail** as the app
4. Copy the generated 16-character password
5. Use this password in your `GMAIL_APP_PASSWORD` environment variable

**Important**: Use the App Password, NOT your regular Gmail password!

## 🗄️ MongoDB Setup Options

### Option 1: Local MongoDB
```bash
# macOS (using Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address
5. Get the connection string and update `MONGODB_URI`

### Option 3: Docker MongoDB
```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use Docker Compose
docker-compose up -d
```

## 📊 Database Structure

Contact form submissions are stored with this structure:

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'm interested in working with you...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "ip": "192.168.1.1"
}
```

## 🧪 Testing the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test the contact form**:
   - Navigate to your portfolio contact section
   - Fill out and submit the form
   - Check your Gmail inbox for the email
   - Verify data is saved in MongoDB

3. **Check database** (optional):
   ```bash
   # Connect to MongoDB
   mongosh

   # Switch to your database
   use portfolio

   # View contact submissions
   db.contact_submissions.find().pretty()
   ```

## 🔧 API Endpoints

### Contact Form Submission
- **POST** `/api/contact`
- Sends email via Gmail SMTP and saves to MongoDB

### Admin API (Optional)
- **GET** `/api/admin/contacts?limit=50`
- Requires `Authorization: Bearer your-admin-secret` header
- Returns contact form submissions

## 🛡️ Security Features

- ✅ Input validation and sanitization
- ✅ Email format validation
- ✅ Rate limiting ready (can be added)
- ✅ Environment variables for sensitive data
- ✅ Admin API with authentication
- ✅ Error handling and logging

## 🚨 Troubleshooting

### Email Issues
- **"Invalid login"**: Check your App Password, not regular password
- **"Less secure apps"**: Use App Passwords instead
- **Gmail blocking**: Check Gmail's security settings

### Database Issues
- **Connection refused**: Make sure MongoDB is running
- **Authentication failed**: Check MongoDB credentials
- **Collection not found**: Run `npm run setup-db`

### General Issues
- Check console logs for detailed error messages
- Verify all environment variables are set
- Ensure MongoDB service is running
- Test with a simple contact form submission

## 📝 Production Considerations

1. **Environment Variables**: Use a proper environment management system
2. **Rate Limiting**: Implement rate limiting for production
3. **Email Templates**: Customize email templates as needed
4. **Database Backup**: Set up regular MongoDB backups
5. **Monitoring**: Add logging and monitoring for production use
6. **SSL**: Ensure HTTPS in production

## 🎯 Features Included

- ✅ Gmail SMTP integration
- ✅ MongoDB storage
- ✅ Form validation
- ✅ Error handling
- ✅ Admin API
- ✅ Database setup script
- ✅ TypeScript support
- ✅ Responsive design
- ✅ Success/error feedback
