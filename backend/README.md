# Resume Builder Backend API

Backend authentication system built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ User signup with email, password, and full name
- ✅ Secure login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Rate limiting for security
- ✅ CORS enabled
- ✅ Error handling middleware

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   ├── auth.js               # JWT verification
│   └── errorHandler.js       # Error handling
├── models/
│   └── User.js               # User schema
├── routes/
│   └── auth.js               # Auth routes
├── .env.example              # Environment template
├── server.js                 # Main server file
└── package.json
```

## 🔧 Installation

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB (see MongoDB Setup section below)**

5. **Add your environment variables in .env:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key_min_32_characters
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

6. **Start the server:**
   ```bash
   npm run dev
   ```

## 📊 MongoDB Atlas Setup (FREE)

### Step 1: Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up

### Step 2: Create Cluster
1. Choose **FREE M0 Cluster** (512MB)
2. Select cloud provider (AWS recommended)
3. Choose region closest to you
4. Click "Create Cluster"

### Step 3: Database Access
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password (save these!)
5. Set role to "Read and write to any database"
6. Click "Add User"

### Step 4: Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Clusters" (Database)
2. Click "Connect" button
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., `resume-builder`)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume-builder?retryWrites=true&w=majority
```

### Step 6: Add to .env
Paste the connection string in your `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume-builder?retryWrites=true&w=majority
```

### Step 7: Generate JWT Secret
Run this in terminal to generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and add to `.env`:
```
JWT_SECRET=paste_generated_string_here
```

## 🔌 API Endpoints

### 1. Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 3. Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-02-01T10:00:00.000Z"
  }
}
```

### 4. Health Check
```http
GET /api/health
```

## 🧪 Testing with Postman/Thunder Client

1. **Install Thunder Client extension in VS Code** (or use Postman)

2. **Test Signup:**
   - Method: POST
   - URL: http://localhost:5000/api/auth/signup
   - Body (JSON):
     ```json
     {
       "fullName": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

3. **Test Login:**
   - Method: POST
   - URL: http://localhost:5000/api/auth/login
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

4. **Test Protected Route:**
   - Method: GET
   - URL: http://localhost:5000/api/auth/me
   - Headers: 
     - Key: `Authorization`
     - Value: `Bearer your_token_from_login`

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Security headers
- **Mongo Sanitize**: Prevents NoSQL injection
- **Input Validation**: Server-side validation
- **CORS**: Configured for frontend access

## 📝 Next Steps

After backend is running:
1. Test all endpoints with Postman/Thunder Client
2. Connect your Next.js frontend to these APIs
3. Store JWT token in frontend (localStorage/cookies)
4. Add protected routes in frontend

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your connection string
- Ensure IP is whitelisted in MongoDB Atlas
- Verify username/password are correct

**Port Already in Use:**
- Change PORT in .env file
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

**Dependencies Error:**
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

## 📞 Support

If you face any issues, check:
1. .env file is configured correctly
2. MongoDB Atlas cluster is running
3. All dependencies are installed
4. Server is running on correct port
