import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ClientDashboard from './pages/ClientDashboard';
import PostJob from './pages/PostJob';
import Feed from './pages/Feed';
import MyApplications from './pages/MyApplications';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import ApplyJob from './pages/ApplyJob';
import { useApp } from './context/AppContext';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, isClient, isFreelancer } = useApp();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roles) {
    if (roles.includes('Client') && !isClient()) {
      return <Navigate to="/feed" />;
    }
    if (roles.includes('FreeLancer') && !isFreelancer()) {
      return <Navigate to="/client-dashboard" />;
    }
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      
      {/* Client Routes */}
      <Route
        path="/client-dashboard"
        element={
          <ProtectedRoute roles={['Client']}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-job"
        element={
          <ProtectedRoute roles={['Client']}>
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications/:jobId"
        element={
          <ProtectedRoute roles={['Client']}>
            <Applications />
          </ProtectedRoute>
        }
      />
      
      {/* Freelancer Routes */}
      <Route
        path="/feed"
        element={
          <ProtectedRoute roles={['FreeLancer']}>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-applications"
        element={
          <ProtectedRoute roles={['FreeLancer']}>
            <MyApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/:jobId"
        element={
          <ProtectedRoute roles={['FreeLancer']}>
            <JobDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply/:jobId"
        element={
          <ProtectedRoute roles={['FreeLancer']}>
            <ApplyJob />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App; 