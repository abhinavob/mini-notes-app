# Mini Notes App

A full-stack notes application built with React, FastAPI, and PostgreSQL. Users can create, edit, delete, search, and organize notes using tags through a clean and responsive interface.

## Live Demo

Frontend:
`https://mini-notes-app-coral.vercel.app`

Backend API Docs:
`https://mini-notes-app-production.up.railway.app/docs`

---

# Features

* Create notes
* Edit notes
* Delete notes
* Search notes
* Tag-based filtering
* Responsive modern UI
* REST API backend
* PostgreSQL database integration
* Full deployment using Railway and Vercel

---

# Tech Stack

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

## Database

* PostgreSQL (Railway)

## Deployment

* Railway (Backend + Database)
* Vercel (Frontend)

### Frontend:


---

# Project Structure

```txt
mini-notes-app/
│
├── backend/
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── data/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/mini-notes-app.git
cd mini-notes-app
```

---

# Backend Setup

## 1. Create Virtual Environment

```bash
python -m venv venv
```

## 2. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file inside `backend/`

```env
DATABASE_URL=your_postgresql_database_url
```

---

## 5. Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```txt
http://localhost:8000
```

API docs:

```txt
http://localhost:8000/docs
```

---

# Frontend Setup

## 1. Install Dependencies

```bash
cd frontend
npm install
```

---

## 2. Configure Environment Variables

Create `.env` inside `frontend/`

```env
VITE_API_URL=http://localhost:8000
```

---

## 3. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Database

The application uses PostgreSQL hosted on Railway.

SQLAlchemy is used as the ORM layer for:

* database models
* CRUD operations
* PostgreSQL integration

---

# Deployment

## Backend Deployment

* Backend deployed on Railway
* PostgreSQL database hosted on Railway

## Frontend Deployment

* Frontend deployed on Vercel

---

# API Endpoints

## Notes

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | `/notes`      | Get all notes |
| POST   | `/notes`      | Create a note |
| PUT    | `/notes/{id}` | Update a note |
| DELETE | `/notes/{id}` | Delete a note |

---

# Key Learnings

During this project, I learned:

* React component architecture
* FastAPI backend development
* REST API design
* SQLAlchemy ORM
* PostgreSQL integration
* Environment variable management
* CORS configuration
* Full-stack deployment workflow
* Git and GitHub workflow

---

# Future Improvements

* User authentication
* Dark mode
* Rich text editor
* Markdown support
* Note timestamps