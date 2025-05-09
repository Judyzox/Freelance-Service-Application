import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import PostJob from './pages/PostJob';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ClientDashboard from './pages/ClientDashboard';
import ApplyJob from './pages/ApplyJob';
import Feed from './pages/Feed';
import Applications from './pages/Applications';
import MyApplications from './pages/MyApplications';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App; 