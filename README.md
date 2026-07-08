# CarePlus Hospital

A modern, full-stack hospital website with a React (Vite) + Tailwind CSS frontend and a
Django + Django REST Framework + PostgreSQL backend, secured with JWT authentication.

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, react-hot-toast
**Backend:** Django, Django REST Framework, Simple JWT, django-cors-headers
**Database:** PostgreSQL (Supabase)
**Deployment:** Backend on Render, Frontend on Netlify

## Project Structure

```
careplus-hospital/
├── backend/
│   ├── careplus/          # Django project settings, urls, wsgi/asgi
│   ├── accounts/          # Custom user model, register/login/profile
│   ├── doctors/           # Doctor listing, search, filter
│   ├── departments/       # Department listing
│   ├── appointments/      # Authenticated appointment booking
│   ├── contact/           # Public contact form storage
│   ├── manage.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── runtime.txt
│   ├── build.sh
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js           # Axios instance with JWT refresh interceptor
    │   ├── context/AuthContext.jsx
    │   ├── components/            # Navbar, Footer, cards, protected route, etc.
    │   ├── pages/                 # Home, About, Doctors, Departments, Book, Contact, Login, Register
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/_redirects   # Netlify SPA redirect rule
    ├── netlify.toml
    ├── .env.production
    └── .env.example
```

## 1. Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # then edit .env with your own values
python manage.py migrate
python manage.py seed_departments
python manage.py seed_doctors
python manage.py createsuperuser # optional, for /admin access
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

If you don't set `DATABASE_URL` in `.env`, the backend automatically falls back to a local
SQLite database (`db.sqlite3`) so you can develop without PostgreSQL installed.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env             # sets VITE_API_BASE_URL to localhost
npm run dev
```

The app will be available at `http://localhost:5173`.

## 2. Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `SECRET_KEY` | Django secret key. Generate a long random string for production. |
| `DEBUG` | `True` for local dev, `False` in production. |
| `ALLOWED_HOSTS` | Comma-separated hostnames, e.g. `your-app.onrender.com`. |
| `DATABASE_URL` | Supabase/PostgreSQL connection string. Falls back to SQLite if unset. |
| `DB_SSL_REQUIRE` | `True` to require SSL for the DB connection (recommended for Supabase). |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins allowed to call the API. |

### Frontend (`frontend/.env` / `.env.production`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `https://your-backend.onrender.com/api`. |

No URLs are hardcoded anywhere in the codebase — everything reads from these variables.

## 3. Setting Up Supabase (PostgreSQL)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → Database → Connection string** and copy the URI
   (use the "Connection pooling" string for production if available).
3. Paste it into `DATABASE_URL` in your backend `.env` (and in Render's environment variables).

## 4. Deploying the Backend to Render

1. Push the `backend/` folder to a Git repository.
2. In Render, create a **New Web Service** from that repository (set the root directory to `backend` if your repo contains both frontend and backend).
3. Render will detect `build.sh` — set:
   - **Build Command:** `./build.sh`
   - **Start Command:** (from `Procfile`, auto-detected) `gunicorn careplus.wsgi:application --bind 0.0.0.0:$PORT`
4. Add environment variables in the Render dashboard: `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`, `DATABASE_URL`, `DB_SSL_REQUIRE=True`, `CORS_ALLOWED_ORIGINS`.
5. Deploy. `build.sh` will install dependencies, collect static files, run migrations, and seed departments/doctors automatically.

## 5. Deploying the Frontend to Netlify

1. Push the `frontend/` folder to a Git repository.
2. In Netlify, create a **New site from Git**, set the base directory to `frontend`.
3. Build settings (also defined in `netlify.toml`):
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Add environment variable `VITE_API_BASE_URL` pointing to your deployed Render backend, e.g. `https://your-backend.onrender.com/api`.
5. The included `public/_redirects` file (and `netlify.toml`) ensures React Router routes work correctly on refresh/deep-link.
6. Deploy.

## 6. API Overview

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/register/` | POST | Public | Register a new patient account |
| `/api/auth/login/` | POST | Public | Obtain JWT access & refresh tokens |
| `/api/auth/token/refresh/` | POST | Public | Refresh an access token |
| `/api/auth/profile/` | GET | Authenticated | Get current user's profile |
| `/api/departments/` | GET | Public | List all departments |
| `/api/departments/<slug>/` | GET | Public | Department detail |
| `/api/doctors/` | GET | Public | List doctors (supports `?search=` and `?department=<slug>`) |
| `/api/doctors/<id>/` | GET | Public | Doctor detail |
| `/api/appointments/` | GET | Authenticated | List the logged-in patient's appointments |
| `/api/appointments/` | POST | Authenticated | Book a new appointment |
| `/api/contact/` | POST | Public | Submit a contact message |

## 7. Notes

- Passwords are validated with Django's built-in password validators (min length, common password checks, etc.) plus custom serializer validation.
- JWT access tokens are short-lived (60 minutes); the Axios client automatically retries once with a refreshed token on a 401 response, and logs the user out if the refresh also fails.
- Appointment booking requires authentication; unauthenticated users are redirected to `/login` via `ProtectedRoute` and returned to their original destination after logging in.
- Realistic seed data (8 departments, 12 doctors) is included via Django management commands so the site looks populated out of the box.
