import JobList from '../components/JobList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Jobs() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'freelancer') navigate('/');
  }, [navigate]);
  return (
    <div className="page-container">
      <h1>Available Jobs</h1>
      <JobList />
    </div>
  );
}