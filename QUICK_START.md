# Profile API - Quick Start Guide

## ✅ Implementation Complete!

### What's Been Implemented

**Backend (Already Deployed):**
- ✅ Profile API endpoints (GET & PUT `/api/profile`)
- ✅ JWT authentication protection
- ✅ Field validation (LinkedIn URL, character limits)
- ✅ MongoDB User model with profile fields
- ✅ Deployed to Render: https://resume-builder-backend-sdyq.onrender.com

**Frontend (Ready to Test):**
- ✅ Profile service with API calls
- ✅ Redux slice with async thunks
- ✅ Profile page with edit functionality
- ✅ Toast notifications (success/error)
- ✅ Loading states and spinners
- ✅ Centralized error handling
- ✅ TypeScript type safety

---

## How to Test

### 1. Start Development Server
```bash
cd frontend
npm run dev
```

### 2. Login
- Go to http://localhost:3000/login
- Login with your account

### 3. Visit Profile Page
- Navigate to http://localhost:3000/dashboard/profile
- Your profile will automatically load from the backend

### 4. Edit Profile
1. Click "Edit Profile" button
2. Update any fields:
   - Full Name
   - Professional Headline
   - Location
   - LinkedIn URL
   - Bio (max 500 characters)
3. Click "Save Changes"
4. See success toast: "Profile updated successfully!" ✅

### 5. Test Validation
Try these to see error toasts:
- Invalid LinkedIn URL: `not-a-linkedin-url`
- Empty Full Name
- Bio > 500 characters

---

## API Endpoints

### Get Profile
```bash
GET /api/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

### Update Profile
```bash
PUT /api/profile
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "fullName": "Your Name",
  "professionalHeadline": "Your Headline",
  "location": "Your Location",
  "linkedinUrl": "https://linkedin.com/in/yourprofile",
  "bio": "Your bio here..."
}
```

---

## Toast Notifications

**Success:** ✅
- Message: "Profile updated successfully!"
- Duration: 3 seconds
- Color: Green icon

**Error:** ❌
- Message: Validation error from backend
- Duration: 4 seconds
- Color: Red icon

---

## Files Modified/Created

### Created:
- `frontend/src/services/profile.service.js`
- `frontend/src/store/slices/profileSlice.ts`
- `frontend/.env.local` (if not exists)

### Modified:
- `frontend/src/config/api.config.js` - Added PROFILE endpoints
- `frontend/src/store/index.ts` - Added profileReducer
- `frontend/src/app/layout.tsx` - Added Toaster component
- `frontend/src/app/dashboard/profile/page.tsx` - Full Redux integration
- `frontend/package.json` - Added react-hot-toast

---

## Environment Variables

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=https://resume-builder-backend-sdyq.onrender.com
NEXT_PUBLIC_ENV=production
```

---

## Deploy Frontend

When ready to deploy:

```bash
cd frontend
vercel --prod
```

Then update Vercel environment variables with:
```
NEXT_PUBLIC_API_BASE_URL=https://resume-builder-backend-sdyq.onrender.com
```

---

## Next Steps

1. ✅ Test profile page locally
2. ✅ Verify toast notifications work
3. ✅ Test validation errors
4. ✅ Deploy to Vercel if everything works
5. ✅ Test on production URL

---

## Support

If you see errors:
1. Check browser console for API errors
2. Verify JWT token in localStorage
3. Check backend logs on Render
4. Make sure you're logged in

---

**Ready to use! 🚀**

Navigate to `/dashboard/profile` and start editing your profile!
