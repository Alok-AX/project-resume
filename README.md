# Resume Builder - Full Stack Project

A complete **resume builder application** with a modern Next.js frontend and secure Node.js/Express backend.

## 📁 Project Structure

```
project-resume/
├── frontend/          # Next.js 16 + React 19 + Tailwind CSS
│   ├── src/
│   ├── package.json
│   └── ... (Next.js configuration files)
│
├── backend/           # Express.js + MongoDB + JWT Authentication
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md          # This file
```

## 🚀 Quick Start

### **Frontend (Next.js)**
```bash
cd frontend
npm install
npm run dev
# Opens: http://localhost:3000
```

### **Backend (Express.js)**
```bash
cd backend
npm install
npm run dev
# Runs on: http://localhost:5001
```

## 🎯 Tech Stack

**Frontend:**
- Next.js 16
- React 19
- Tailwind CSS
- Redux Toolkit

**Backend:**
- Express.js
- MongoDB Atlas
- JWT Authentication
- Bcrypt

## 📖 Setup Instructions

### 1. Frontend
See `frontend/README.md` for detailed setup

### 2. Backend
See `backend/README.md` for detailed setup

## 🌐 Deployment

**Backend:** Deploy to Render (Free)
**Frontend:** Deploy to Vercel (Free)

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-resume
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Project Structure
- `src/`: Contains the main application code.
- `components/`: Reusable components.
- `store/`: Redux store and slices.
- `services/`: Mock API services.
- `hooks/`: Custom hooks.
- `utils/`: Utility functions.
- `styles/`: Global styles and Tailwind configuration.

### Features
- User authentication (login, signup, forgot password)
- CV builder with various templates
- ATS score analysis
- AI cover letter generation
- User dashboard for managing resumes and cover letters

### Technologies Used
- Next.js 14+
- Tailwind CSS
- Redux Toolkit
- TypeScript
- Axios
- React Hook Form + Zod
- Framer Motion

## License
This project is licensed under the MIT License.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
