# Momento

## Overview
The **Momento** is a robust backend application built with **Hono**, **Prisma**, and **PostgreSQL**. It provides comprehensive functionalities for user authentication, event management, and booking systems, while enforcing a structured repository pattern and pre-commit hooks with **Husky**.

### Features
✅ **User Authentication** (Prisma & PostgreSQL)  
✅ **Role-Based Access Control** (`USER`, `ADMIN`, `ORGANIZER`)  
✅ **Event Creation & Management**  
✅ **Event Booking System**  
✅ **Automated Code Quality Checks** (Husky)  

---

## Tech Stack
- **Framework**: [Hono](https://hono.dev/) (Fast web framework for Edge & Serverless)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Linting & Formatting**: ESLint, Prettier
- **Pre-commit Hooks**: Husky

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (`>=16.x`)
- [PostgreSQL](https://www.postgresql.org/) (Running instance)
- Prisma CLI:
  ```bash
  npm install -g prisma
  ```

### Setup
#### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/event-management.git
cd event-management
```

#### 2️⃣ Install dependencies
```bash
npm install
```

#### 3️⃣ Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and update the database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/eventdb"
```

#### 4️⃣ Run database migrations
```bash
npx prisma migrate dev --name init
```

#### 5️⃣ Generate Prisma Client
```bash
npx prisma generate
```

#### 6️⃣ Start the development server
```bash
npm run dev
```

---

## Project Structure
```
📂 event-management/
├── prisma/          # Prisma schema & migrations
├── src/
│   ├── lib/         # Business logic for handling requests
│   ├── routes/      # API route definitions
│   ├── schema/      # Database interactions using Prisma
│   ├── util/        #Helper Functions
│   ├── index.ts/    # Hono server entry point
│   
├── .husky/          # Pre-commit hooks configuration
├── .env             # Environment variables
├── package.json     # Dependencies & scripts
└── README.md        # Documentation
```

---

## API Endpoints
### Authentication
- **`POST /auth/register`** – Register a new user
- **`POST /auth/login`** – Authenticate and receive a JWT

### User
- **`GET /User`** - Checks for the user and returns user specific details

###  Events
- **`POST /events`** – Create a new event 
- **`GET /events`** – List all events
- **`GET /events/:id`** – Get event details
- **`DELETE /events/:id`** – Delete an event

###  Bookings
- **`POST /bookings`** – Book an event
- **`GET /bookings`** – List user bookings

---

## Husky Pre-commit Hooks
This project uses **Husky** to enforce code quality **before committing**.

✅ Runs **ESLint** and **Prettier** checks.  
❌ Prevents commits with linting errors.  

### Install Husky hooks:
```bash
npx husky install
```

---

## Running Tests
```bash
npm test
```

---

## Contributing
1. **Fork** the repository.
2. **Create a feature branch**:  
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:  
   ```bash
   git commit -m "Add new feature"
   ```
4. **Push to the branch**:  
   ```bash
   git push origin feature-name
   ```
5. **Open a Pull Request** 🚀

---

## License
This project is licensed under the **MIT License**.

📜 _Feel free to modify and distribute._

