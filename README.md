# DevangTaskManager

Full-stack task management application with JWT authentication, role-based access control, admin panel support, and a React + Vite frontend.

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT auth + bcrypt password hashing
- express-validator, helmet, cors, express-rate-limit
- Swagger docs (`/api-docs`)

### Frontend
- React + Vite
- React Router
- Axios
- Framer Motion
- React Hot Toast

## Current Architecture (Updated)

- Backend routes are versioned under `/api/v1/*`
- Frontend API clients call `/api/v1` (proxied by Vite to `http://localhost:5000`)
- Auth flow is centralized in `AuthContext`
- Task status values are backend-compatible enums:
  - `todo`
  - `in-progress`
  - `done`

## Project Structure

```txt
backend/
  src/
    config/
    controllers/
    docs/
    middleware/
    models/
    routes/v1/
    utils/
    server.js
frontend/
  src/
    api/
    components/
    context/
    pages/
    services/
    App.jsx
README.md
```

## Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB running locally OR MongoDB Atlas URI

## Environment Setup

In `backend/.env` add:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapi
JWT_SECRET=your_strong_secret_here
JWT_EXPIRE=7d
```

You can copy from `backend/.env.example` and then edit values.

## Installation

### 1) Install backend dependencies

```bash
cd backend
npm install
```

### 2) Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Run the App

### 1) Start backend

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2) Start frontend (new terminal)

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API & Routes

### Public Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Authenticated
- `GET /api/v1/auth/me`
- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

### Admin Only
- `GET /api/v1/users`
- `DELETE /api/v1/users/:id`
- `GET /api/v1/tasks/all`

Swagger docs: `http://localhost:5000/api-docs`

## How To Use

1. Register a user account from the frontend.
2. Login with your credentials.
3. Create, update, and delete your tasks from Dashboard.
4. If logged in as admin, open Admin page to manage users and view all tasks.

## Notes

- If auth state looks stale after changes, restart both frontend and backend servers.
- If token expires or is invalid, frontend redirects to `/login`.
- Ensure MongoDB is reachable before starting backend.

## License

ISC
