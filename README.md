# CodeMentor AI — Frontend

React frontend for CodeMentor AI, an AI-powered Java code evaluation platform.

## 🚀 Live Demo

- **Frontend:** https://codementor-ui.vercel.app
- **API Docs (Swagger):** https://codementor-api-oy2m.onrender.com/swagger-ui/index.html

> ⚠️ First load may take 30-60 seconds (free tier cold start)

## Tech Stack

- React 18 (Vite)
- Tailwind CSS v3
- Monaco Editor (VS Code-like)
- Axios + JWT Interceptor
- React Router DOM v6
- React Hot Toast
- Lucide React Icons

## Features

- JWT Authentication (Signup/Login/Logout)
- AI-powered Java Code Analysis
- Monaco Code Editor with Java syntax highlighting
- Dashboard with submission stats
- Submission History with search
- Submission Detail View
- Profile Management
- Dark Theme (GitHub-inspired)
- Protected Routes

## Local Setup

```bash
git clone https://github.com/shwetatyagii/codementor-ui.git
cd codementor-ui
npm install
npm run dev
```

Open: http://localhost:5173

## Environment Variables

VITE_API_BASE_URL=http://localhost:8081

## Deployment

- Hosted on **Vercel** (auto-deploy on push to main)
- Backend required: https://github.com/shwetatyagii/codementor-api

## Repositories

- **Frontend:** https://github.com/shwetatyagii/codementor-ui
- **Backend:** https://github.com/shwetatyagii/codementor-api
