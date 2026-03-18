# INVESTCORP CAPITAL - Investment Platform

A complete investment management platform with marketing pages, admin dashboard, and client portal.

## Features

- **Marketing Pages**: Home, About, Services, Plans, FAQ, Contact
- **Admin Dashboard**: Manage clients, profits, subscriptions, and messages
- **Client Portal**: Read-only access for clients to view their investment data
- **RTL Support**: Full Arabic language support
- **Modern Design**: Glass-morphism UI with dark theme

## Tech Stack

- **Backend**: FastAPI + SQLite + JWT Authentication
- **Frontend**: React + Vite + TypeScript + Tailwind CSS

## Setup

### Backend
```bash
cd backend
pip install poetry
poetry install
poetry run fastapi dev app/main.py --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Default Admin Credentials
- Username: `admin`
- Password: `admin123`
