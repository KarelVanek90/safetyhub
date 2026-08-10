# SafetyHub

Modern Occupational Health & Safety (OHS) management application built with React, TypeScript, Node.js, Express and MongoDB.

> 🚧 SafetyHub is currently under active development.

## About

SafetyHub is a full-stack web application designed to help companies manage occupational health and safety processes in one place.

The goal is to simplify the management of employees, medical examinations, training, PPE, documents, inspections and important deadlines.

## Live Demo

The current version of SafetyHub is deployed online:

**Frontend:**  
https://safetyhub-client.onrender.com/dashboard

**API:**  
https://safetyhub-api.onrender.com

## Current Features

The current development version includes:

- Dashboard with an overview of key OHS data
- Employee overview
- Employee data stored in MongoDB
- Adding new employees through a form
- Medical examination status overview
- Training status overview
- PPE status overview
- Upcoming events and deadlines
- Compliance overview
- REST API communication between frontend and backend
- Persistent data storage
- Production deployment

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### Deployment

- Render
- MongoDB Atlas
- GitHub

## Project Structure

```text
SafetyHub/
├── client/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── data/
│       ├── hooks/
│       ├── layouts/
│       ├── learning/
│       ├── pages/
│       ├── services/
│       ├── types/
│       └── utils/
│
├── server/
│   └── src/
│       ├── config/
│       ├── models/
│       ├── routes/
│       └── server.ts
│
└── README.md
```

## Architecture

```text
React + TypeScript
        │
        │ HTTP / REST API
        ▼
Node.js + Express
        │
        ▼
MongoDB Atlas
```

## Planned Features

SafetyHub is being developed step by step. Planned features include:

- Employee detail and editing
- Employee deletion
- Authentication and authorization
- User roles (Admin / Manager / Employee)
- Medical examination management
- Training management
- PPE issue records
- Document management
- Equipment and inspection tracking
- Notifications and deadline alerts
- Risk-based compliance overview
- Company inspection readiness check
- AI-assisted document analysis

## Local Development

Clone the repository:

```bash
git clone https://github.com/KarelVanek90/safetyhub.git
```

Install frontend dependencies:

```bash
cd client
npm install
npm run dev
```

Install backend dependencies:

```bash
cd server
npm install
npm run dev
```

### Environment Variables

The backend requires:

```env
MONGO_URI=your_mongodb_connection_string
```

The frontend requires:

```env
VITE_API_URL=http://localhost:5000
```

Environment files are not included in the repository.

## Project Status

SafetyHub is a learning and portfolio project that is being developed into a more complete OHS management application.

The project focuses not only on UI development, but also on building a real full-stack architecture, working with APIs, persistent data, TypeScript, and production deployment.

## Author

**Karel Vaněk**

GitHub: [KarelVanek90](https://github.com/KarelVanek90)
