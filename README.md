# TaskFlow - REST API with Auth & RBAC

A full stack task management app with JWT authentication, role based access control, and a React frontend. built for learning and as an assignment project.

## tech stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT auth with bcrypt
- express-validator, helmet, cors, rate-limiting
- Swagger for API docs

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion for animations
- React Router, Axios, React Hot Toast

## getting started

### prereqs
- Node.js v16+
- MongoDB running locally (or a cloud URI)

### backend setup

```bash
cd backend
cp .env.example .env
# edit .env with your mongo URI and jwt secret
npm install
npm run dev
```

server runs on `http://localhost:5000`  
swagger docs at `http://localhost:5000/api-docs`

### frontend setup

```bash
cd frontend
npm install
npm run dev
```

frontend runs on `http://localhost:5173` and proxies API calls to the backend

## API endpoints

| Method | Endpoint | Access | What it does |
|--------|----------|--------|--------------|
| POST | /api/v1/auth/register | Public | register new user |
| POST | /api/v1/auth/login | Public | login, get jwt |
| GET | /api/v1/auth/me | Auth | get current user |
| GET | /api/v1/users | Admin | list all users |
| DELETE | /api/v1/users/:id | Admin | delete a user |
| GET | /api/v1/tasks | Auth | get my tasks |
| POST | /api/v1/tasks | Auth | create task |
| GET | /api/v1/tasks/:id | Auth | get single task |
| PUT | /api/v1/tasks/:id | Auth | update task |
| DELETE | /api/v1/tasks/:id | Auth | delete task |
| GET | /api/v1/tasks/all | Admin | get all tasks |

## project structure

```
backend/
├── src/
│   ├── config/         # db connection
│   ├── controllers/    # route handlers
│   ├── docs/           # swagger config
│   ├── middleware/      # auth, validation, errors
│   ├── models/         # mongoose schemas
│   ├── routes/v1/      # api routes
│   ├── utils/          # helpers, validators
│   └── server.js
frontend/
├── src/
│   ├── api/            # axios instance
│   ├── components/     # reusable components
│   ├── context/        # auth context
│   ├── pages/          # page components
│   └── App.jsx
```

## security stuff

- passwords hashed with bcrypt (salt rounds 10)
- JWT tokens for stateless auth
- role based access control (user vs admin)
- helmet for HTTP headers
- CORS enabled
- rate limiting on API routes (100 req per 15min)
- input validation with express-validator
- request body size limited to 10kb

## scalability notes

this project is built with scalability in mind even tho its a small app right now:

- **Modular structure** - easy to add new entities/routes without touching existing code. just create a new model, controller, route file and plug it in
- **API versioning** - routes are under `/api/v1/` so we can add v2 later without breaking existing clients
- **Stateless JWT** - no server side sessions means the app can be horizontally scaled behind a load balancer easily
- **Can add Redis** - for token blacklisting (logout), caching frequently accessed data, and session management if needed later
- **Docker ready** - the project structure is clean enough to containerize both frontend and backend services
- **Microservices potential** - auth service and task service could be split into separate deployments when traffic grows
- **Rate limiting** - already in place to prevent abuse and DOS attacks
- **Database indexing** - mongoose unique index on email, can add more indexes as queries grow

for a production deployment youd probably want:
- nginx reverse proxy
- docker compose for the whole stack
- CI/CD pipeline (github actions)
- environment specific configs
- logging service (winston + ELK or similar)
- monitoring (prometheus + grafana)

## license

ISC
