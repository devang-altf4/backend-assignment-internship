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

## Seed Admin User

To create/update the default admin account:

```bash
cd backend
npm run seed:admin
```

Seeded admin credentials:
- Email: `admin@gmail.com`
- Password: `admin123`

## Admin Access

### Admin login details
- Email: `admin@gmail.com`
- Password: `admin123`

### How to access admin panel
1. Start backend and frontend servers.
2. Run admin seed once:

```bash
cd backend
npm run seed:admin
```

3. Open: `http://localhost:5173/admin`
4. If not logged in as admin, app redirects to: `http://localhost:5173/admin-login`
5. Login with admin credentials above.

## Seed Dummy Tasks (Todo/Ongoing/Completed)

To insert 3 CRUD-ready dummy tasks for each user (if missing):

```bash
cd backend
npm run seed:dummy
```

This adds:
- Need to bathe my cat (`todo`)
- Need to cut my hair (`in-progress`)
- Finished attending meeting (`done`)

These tasks are normal DB records and can be created/read/updated/deleted from the Dashboard.

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

1. Open the app at `http://localhost:5173` (Dashboard is the landing page).
2. Login or Sign Up to perform task CRUD operations.
3. For admin access, open `http://localhost:5173/admin` (you will be redirected to `/admin-login` if not authenticated as admin).
4. Use seeded admin credentials (`admin@gmail.com` / `admin123`) after running `npm run seed:admin`.

## Notes

- If auth state looks stale after changes, restart both frontend and backend servers.
- If token expires or is invalid, frontend redirects to `/login`.
- Ensure MongoDB is reachable before starting backend.

## License

ISC
