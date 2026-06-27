# 📋 Task Tracker — MERN Stack

A full-stack Task Tracker web application built with MongoDB, Express.js, React, and Node.js.

## Features

**Mandatory**
- ✅ Create, View, Update & Delete tasks (full CRUD)
- ✅ Form validation (client + server side)
- ✅ REST API (5 endpoints)
- ✅ MongoDB integration via Mongoose
- ✅ Responsive UI (mobile + desktop)
- ✅ Dynamic updates without page refresh
- ✅ Deployed frontend + backend on public URLs

**Bonus**
- ✅ Filter by status and priority
- ✅ Sort by date / priority
- ✅ Notification toasts
- ✅ Reusable components (TaskCard, TaskForm, FilterBar)
- ✅ Environment variables for all config
- ✅ Overdue task highlighting

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Deploy FE | Vercel |
| Deploy BE | Render |

## Project Structure

```
task-tracker/
├── backend/
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── models/Task.js     # Mongoose schema
│   │   ├── controllers/       # Business logic
│   │   └── routes/            # Express routes
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js             # Root component
    │   ├── components/        # TaskCard, TaskForm, FilterBar
    │   ├── hooks/useTasks.js  # Data fetching hook
    │   └── services/api.js    # Axios API layer
    ├── public/
    ├── .env.example
    └── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (supports ?status, ?priority, ?sort) |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

---

## 🚀 Deployment Guide

### Step 1 — MongoDB Atlas

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → sign up free
2. Create a cluster (free tier M0)
3. Database Access → Add User → copy username + password
4. Network Access → Allow from anywhere (0.0.0.0/0)
5. Connect → Drivers → copy the connection string
6. Replace `<password>` in the string with your actual password

### Step 2 — Deploy Backend on Render

1. Push the `backend/` folder to a GitHub repo (or the whole monorepo)
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add Environment Variables:
   - `MONGO_URI` → your Atlas connection string
   - `FRONTEND_URL` → your Vercel URL (add after step 3)
   - `PORT` → 5000
6. Deploy → copy the Render URL (e.g. `https://task-tracker-xyz.onrender.com`)

### Step 3 — Deploy Frontend on Vercel

1. Push the `frontend/` folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
4. Add Environment Variable:
   - `REACT_APP_API_URL` → `https://your-render-url.onrender.com/api`
5. Deploy → copy the Vercel URL
6. Go back to Render → update `FRONTEND_URL` with your Vercel URL → redeploy

### Step 4 — Local Development

```bash
# Backend
cd backend
cp .env.example .env    # fill in your MONGO_URI
npm install
npm run dev             # runs on localhost:5000

# Frontend (new terminal)
cd frontend
cp .env.example .env    # set REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start               # runs on localhost:3000
```

---

Built with ❤️ for CollEdge Connect Full Stack Development Internship Assignment
