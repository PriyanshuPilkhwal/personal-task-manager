# Personal Task Manager

A full-stack task management application built with React, Node.js, Express, and SQLite.

## Live Demo

- **Frontend:** https://personaltaskmanagerai.vercel.app
- **Backend API:** https://personal-task-manager-8cvc.onrender.com

## Tech Stack

### Frontend
- React 18 (via Vite)
- Tailwind CSS
- Axios
- date-fns
- Lucide React

### Backend
- Node.js
- Express.js
- SQLite (via better-sqlite3)
- dotenv
- CORS

## Features

- Create tasks with a title, description, and due date
- Mark tasks as complete or active with one click
- Edit existing tasks inline
- Delete tasks permanently
- Filter tasks by All, Active, or Completed status
- Overdue date detection with visual warning
- Skeleton loading states
- Fully persistent data via SQLite database

## Project Structure
```text
personal-task-manager/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── main.js
│   └── ...
├── server/               # Node.js backend
│   ├── db.js
│   ├── routes.js
│   ├── server.js
│   └── database.db       # Auto-generated
└── README.md

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Fetch all tasks (optional ?status=active\|completed) |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task or toggle status |
| DELETE | /api/tasks/:id | Delete a task |

## Getting Started Locally

### Prerequisites
- Node.js v18 or higher
- npm

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/personal-task-manager.git
cd personal-task-manager
```

### 2. Setup the backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 3. Setup the frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` in your browser.

## Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)