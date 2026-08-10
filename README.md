# SafetyHub

SafetyHub is my full-stack project for Occupational Health & Safety (OHS) management.

I am building the application step by step while learning and improving my skills in React, TypeScript, Node.js and backend development.

> 🚧 The project is currently under development.

## About

The goal of SafetyHub is to create one place for managing employees and important workplace safety information.

The application will gradually include medical examinations, training, PPE, documents, inspections and important deadlines.

## Live Demo

**Frontend:**  
https://safetyhub-client.onrender.com/dashboard

**API:**  
https://safetyhub-api.onrender.com

## What Works Now

The current version includes:

- Dashboard
- Employee overview
- Adding a new employee
- Employee data stored in MongoDB
- Medical examination status
- Training status
- PPE status
- Upcoming events
- Compliance overview
- Communication between React frontend and REST API
- Online deployment

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
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── config/
│       │   └── database.ts
│       ├── models/
│       │   └── Employee.ts
│       ├── routes/
│       │   └── employeesRoutes.ts
│       └── server.ts
│
└── README.md
```

## How It Works

```text
React + TypeScript
        │
        │ REST API
        ▼
Node.js + Express
        │
        ▼
MongoDB Atlas
```

## Next Steps

I plan to continue developing:

- Employee detail, editing and deletion
- Authentication
- User roles
- Medical examinations
- Training
- PPE records
- Documents
- Inspections
- Notifications and deadline alerts
- Company inspection readiness check
- AI-assisted document analysis

## Local Development

Clone the repository:

```bash
git clone https://github.com/KarelVanek90/safetyhub.git
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd server
npm install
npm run dev
```

### Environment Variables

Backend:

```env
MONGO_URI=your_mongodb_connection_string
```

Frontend:

```env
VITE_API_URL=http://localhost:5000
```

Environment files are not included in the repository.

## Author

Karel Vaněk

GitHub: [KarelVanek90](https://github.com/KarelVanek90)
