import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function generateJobId() {
  return 'j_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

export default function JobForm() {
  const [job, setJob] = useState({ title: '', description: '', budget: '', deadline: '' });
  const [user, setUser] = useState(null);
  const { setLoading, showToast } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  }, []);

  if (!user) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>You must be logged in as a client to post a job.</div>;
  if (user.role !== 'client') return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Only clients can post jobs.</div>;

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const jobId = generateJobId();
      const createdAt = new Date().toISOString();
      const newJob = {
        jobId,
        clientId: user.userId,
        title: job.title,
        description: job.description,
        budget: job.budget,
        deadline: job.deadline,
        status: 'open',
        createdAt,
        offers: [],
        postedBy: user.fullName,
      };
      localStorage.setItem('jobs', JSON.stringify([...jobs, newJob]));
      setJob({ title: '', description: '', budget: '', deadline: '' });
      showToast('Job posted successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast('Error posting job', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Job Title
        <input 
          name="title" 
          value={job.title} 
          onChange={handleChange} 
          required
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Description
        <textarea 
          name="description" 
          value={job.description} 
          onChange={handleChange} 
          required
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            minHeight: '150px',
            resize: 'vertical'
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Budget ($)
        <input 
          type="number" 
          name="budget" 
          value={job.budget} 
          onChange={handleChange} 
          required
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Deadline
        <input 
          type="date" 
          name="deadline" 
          value={job.deadline} 
          onChange={handleChange} 
          required
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }}
        />
      </label>
      <button 
        type="submit"
        style={{
          background: '#0a66c2',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          marginTop: '1rem'
        }}
      >
        Post Job
      </button>
    </form>
  );
} 