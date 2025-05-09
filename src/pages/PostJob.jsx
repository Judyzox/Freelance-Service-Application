import JobForm from '../components/JobForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
    if (!u || JSON.parse(u).role !== 'client') navigate('/');
  }, [navigate]);
  if (!user || user.role !== 'client') return null;
  return (
    <div className="page-container">
      <h1>Post a New Job</h1>
      <JobForm />
    </div>
  );
} 