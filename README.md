# 💼 Freelance Service Application

A web-based platform that connects clients and freelancers. Clients can post job opportunities, and freelancers can browse and apply for them. The application enables secure user management, job proposals, and project tracking.

---

## 🚀 Features

- 🧑‍💼 **User Management**: Register, login, and manage user profiles (client or freelancer)
- 📢 **Job Posting**: Clients can create jobs with budget, description, and deadline
- 🔍 **Job Discovery**: Freelancers can browse available jobs and submit offers
- ✅ **Offer Handling**: Clients can accept or reject freelancer offers and track project status
- Responsive navigation
- Clean and modern UI

---

## 🧰 Tech Stack

### 🖥️ Frontend
- React
- HTML5, CSS3
- Axios (for API communication)

### 🧪 Backend
- .NET 6/7 Web API
- Entity Framework Core
- SQL Server

### 🐳 Deployment
- Docker
- Render (cloud platform for frontend/backend deployment)

---

## 📁 Project Structure
frontend/
├── public/ # Static files
├── src/ # Source code
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── context/ # React context providers
│ ├── services/ # API and other services
│ ├── App.js # Main application component
│ ├── App.css # Main application styles
│ └── index.js # Application entry point
├── package.json # Project dependencies and scripts
├── package-lock.json # Dependency lock file
├── Dockerfile # Docker configuration
└── README.md # Project documentation
---

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following content:
REACT_APP_API_URL=http://localhost:5000/api

## Running the Application

To start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:
```bash
npm run build
```
```