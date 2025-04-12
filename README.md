# Blog_app

# Blog App

A full-stack blogging application built with Node.js, Express, PostgreSQL for the backend and Next.js for the frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

## 🔍 Overview

Blog App is a modern blogging platform that allows users to read the blog posts. The application includes user authentication, comment functionality, and a responsive UI.

## ✨ Features

- User authentication (register, login, logout)
- Create, edit, and delete blog posts
- Comment on blog posts
- Responsive design
- Rich text editor for blog creation
- User profiles

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js (v5.1.0)
- PostgreSQL (via pg v8.14.1)
- JSON Web Token (JWT) for authentication
- Sequelize ORM (v6.37.7)
- Express Validator (v7.2.1)
- Helmet for security (v8.1.0)
- Morgan for logging (v1.10.0)

### Frontend
- Next.js (v15.3.0)
- React (v19.0.0)
- React Hook Form (v7.55.0)
- Tanstack React Query (v5.72.2)
- Axios (v1.8.4)
- Zod for validation (v3.24.2)
- Tailwind CSS (v3.4.3)

## 📝 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) (v8.x or higher) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v14.x or higher)

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Shivangi-Panigrahy/Blog_app.git
cd Blog_app
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   # Database
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=123456789
   DB_NAME=blog_db
   DB_NAME_TEST=blog_db_test

   # JWT
   JWT_SECRET=your_jwt_secret_key

   # Server
   PORT=8000
   NODE_ENV=development
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the frontend directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| DB_HOST | PostgreSQL database host |
| DB_USER | PostgreSQL username |
| DB_PASSWORD | PostgreSQL password |
| DB_NAME | PostgreSQL database name |
| DB_NAME_TEST | PostgreSQL test database name |
| JWT_SECRET | Secret key for JWT token generation |
| PORT | Port on which the backend server will run |
| NODE_ENV | Environment mode (development, production, test) |

### Frontend (.env.local)

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_API_URL | URL of the backend API |

## 💾 Database Setup

Since there are no automated migrations, we need to set up the database manually:

1. Create the PostgreSQL database:


2. Connect to the database after setting up of correct .env for DB.


3 After successful connection to db the tables will be created automatically.

4. For logging in we will need to register a user and then login in using that credentials.



## 🚀 Running the Application

### Backend

```bash
cd server
npm run dev
# or
yarn dev
```

The backend server will start at `http://localhost:8000`.

### Frontend

```bash
cd client
npm run dev
# or
yarn dev
```

The frontend application will start at `http://localhost:3000`.


## 📁 Folder Structure

```
blog_app/
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Express application entry point
├── client/                 # Frontend Next.js application
│   ├── components/         # React components
│   ├── contexts/           # React contexts
│   ├── pages/              # Next.js pages
│   ├── public/             # Static assets
│   ├── services/           # API services
│   ├── styles/             # CSS styles
│   └── next.config.js      # Next.js configuration
└── README.md               # Project documentation
```
