# SafetyHub

SafetyHub is my full-stack project for Occupational Health & Safety (OHS) management.

I am building the application step by step while learning and improving my skills in React, TypeScript, Node.js and backend development.

> 🚧 The project is currently under development.

## About

SafetyHub is a full-stack application for managing workplace safety and HR-related records.

The goal is not only to store data, but gradually build business logic that can identify upcoming deadlines, expired obligations and missing records.

The application currently focuses on employee and document management, medical examination tracking and deadline-related business logic, with additional modules planned for training, PPE and inspections.

## Live Demo

**Frontend:**  
https://safetyhub-client.onrender.com/dashboard

**API:**  
https://safetyhub-api.onrender.com

## What Works Now

The current version includes:

- Responsive dashboard
- Employee CRUD
  - Create employee
  - Employee list
  - Employee detail
  - Edit employee
  - Delete employee
- Employee search by name and position
- Filtering by work category and medical examination status
- Medical examination business logic
  - Calculation of the next examination date
  - Valid, expiring, expired and unknown statuses
- Dynamic upcoming events
- Dynamic compliance overview
- Training and PPE status overview
- Responsive mobile navigation
- Communication between React frontend and REST API
- MongoDB data persistence
- Online deployment
- Document management
  - Create document
  - Document list
  - Document detail
  - Edit document
  - Delete document
  - Employee and company document assignment
  - Optional expiration dates
  - Sorting by expiration date and last update

## Current Focus

The current development focus is expanding the Documents module with business logic for document validity and expiration.

The next step is to derive document statuses from expiration dates so SafetyHub can identify valid, expiring and expired documents and later use this information in dashboard events, compliance monitoring and notifications.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- Recharts

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
├── client/src/
│   ├── components/
│   ├── functions/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   └── types/
├── server/src/
│   ├── config/
│   ├── models/
│   └── routes/
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

Planned development:

- Document validity and expiration status
- Training management
- PPE records
- Inspections and checks
- Authentication
- User roles
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
