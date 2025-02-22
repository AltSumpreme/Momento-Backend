#### Event Management System

# Overview

This is an Event Management System built with Hono, Prisma, and PostgreSQL. It provides a robust backend for handling user authentication, event creation, and bookings. The project follows a structured repository pattern with Husky for pre-commit hooks.

Features

User authentication with Prisma and PostgreSQL

Role-based access control (USER, ADMIN, ORGANIZER)

Event creation and management

Booking system for events

Automated pre-commit checks using Husky

Tech Stack

Framework: Hono (Fast web framework for Edge & Serverless)

Database: PostgreSQL

ORM: Prisma

Linting & Formatting: ESLint, Prettier

Pre-commit hooks: Husky

Installation

Prerequisites

Node.js (>=16.x)

PostgreSQL (Running instance)

Prisma CLI (npm install -g prisma)

Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/event-management.git
cd event-management
```

Install dependencies:

```bash
npm install
```

Set up the environment variables:

```bash
cp .env.example .env
```

Update .env with your database URL:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/eventdb"
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Generate Prisma client:

```bash
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

Project Structure

├── prisma/ # Prisma schema and migrations
├── src/
│ ├── controllers/ # Business logic for handling requests
│ ├── routes/ # API route definitions
│ ├── services/ # Database interactions using Prisma
│ ├── middleware/ # Authentication & validation middleware
│ ├── utils/ # Helper functions
│ └── server.ts # Hono server entry point
├── .husky/ # Pre-commit hooks configuration
├── .env # Environment variables
├── package.json # Dependencies & scripts
└── README.md # Documentation

API Endpoints

Authentication

POST /auth/register – Register a new user

POST /auth/login – Authenticate and receive a JWT

Events

POST /events – Create a new event (Admin/Organizer only)

GET /events – List all events

GET /events/:id – Get event details

DELETE /events/:id – Delete an event (Admin/Organizer only)

Bookings

POST /bookings – Book an event

GET /bookings – List user bookings

Husky Pre-commit Hooks

This project uses Husky to enforce code quality before committing.

Runs ESLint and Prettier checks.

Prevents commits with linting errors.

To install Husky hooks:

npx husky install

Running Tests

npm test

Contributing

Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature-name).

Open a Pull Request.

License

MIT License.
