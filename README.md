# Full Stack Application

A full-stack application built using **React, TypeScript, Shadcn UI, Node.js, Express, and Prisma**.

## 📁 Project Structure

The repository contains two main folders: `client` and `server`.

```text
project-root/
├── client/     # React + TypeScript + Shadcn UI
├── server/     # Node.js + TypeScript + Prisma
```

## 🚀 Getting Started

Follow the steps below to download, configure, and run the application locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)
- Git
- A database compatible with the project's Prisma schema

### 1. Download the Project

Clone the repository:

```bash
git clone https://github.com/Jigisha15/Employee-Directory
cd Employee-Directory
```

Alternatively, download the repository as a ZIP file from GitHub and extract it.

**Important:** Keep the `client` and `server` folders together inside the same project directory.

### 2. Set Up the Client

The frontend is built with React, TypeScript, Vite, and Shadcn UI.

Open a terminal in the project root and navigate to the client folder:

```bash
cd client
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Replace the URL with your actual backend URL if your server runs on a different port or host.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically `http://localhost:5173`.

### 3. Set Up the Server

Open a **separate terminal** in the project root and navigate to the server folder:

```bash
cd server
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
DATABASE_URL="your_database_connection_string"
```

- `PORT`: The port on which the backend server runs.
- `DATABASE_URL`: The connection string for your database.

Replace the database connection string with your actual database credentials.

Install dependencies:

```bash
npm install
```

### 3.1. Create a Database Using Neon

The easiest way to get a `DATABASE_URL` is to create a free PostgreSQL database using [Neon](https://neon.tech/).

Follow these steps:

1. Visit [Neon](https://neon.tech/) and sign up or log in.
2. Create a new project and choose a project name.
3. Once the database is created, open your project's dashboard.
4. Find the **Connect** option and select it.
5. Copy the PostgreSQL connection string provided by Neon. Make sure you select the connection string format compatible with Prisma.
6. Open `server/.env` and paste the connection string as the value of `DATABASE_URL`.

Your `server/.env` should look like this:

```env
PORT=5000
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

The URL above is only an example. Use the actual connection string provided by Neon.

### 3.2. Configure the Database

After setting up your environment variables, navigate to the server folder and run:

```bash
npx prisma generate
```

If the project includes Prisma migration files, apply them to your Neon database:

```bash
npx prisma migrate deploy
```

If no migration files are included, check the project's Prisma schema and setup instructions before initializing the database. For a development setup, `npx prisma db push` may be appropriate.

Once the database is configured, start the backend:

```bash
npm run dev
```

**Important:** Keep your Neon connection string private. Never commit your actual `DATABASE_URL` or share it publicly on GitHub.
