import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

function generateOfferId() {
  return 'o_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [proposalText, setProposalText] = useState('');
  const [amount, setAmount] = useState('');
  const { setLoading, showToast } = useApp();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJob(jobs.find(j => j.jobId === jobId) || null);
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  }, [jobId]);

  if (!user) return <p>You must be logged in as a freelancer to apply for a job.</p>;
  if (user.role !== 'freelancer') return <p>Only freelancers can apply for jobs.</p>;
  if (!job) return <p>Job not found.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobsArr = JSON.parse(localStorage.getItem('jobs') || '[]');
      const idx = jobsArr.findIndex(j => j.jobId === jobId);
      if (idx !== -1) {
        jobsArr[idx].offers = jobsArr[idx].offers || [];
        if (!jobsArr[idx].offers.some(o => o.freeLancerId === user.userId)) {
          jobsArr[idx].offers.push({
            offerId: generateOfferId(),
            jobId,
            freeLancerId: user.userId,
            amount,
            proposalText,
            status: 'pending',
            createdAt: new Date().toISOString(),
          });
          localStorage.setItem('jobs', JSON.stringify(jobsArr));
          showToast('Application submitted successfully!', 'success');
          navigate('/jobs');
        } else {
          showToast('You have already applied to this job', 'error');
          navigate('/jobs');
        }
      }
    } catch (error) {
      showToast('Error submitting application', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 style={{ color: '#0a66c2', marginBottom: '2rem' }}>Apply for Job</h1>
      <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(10,102,194,0.07)' }}>
        <h2 style={{ marginBottom: '1rem' }}>{job.title}</h2>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>{job.description}</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            Your Proposal
            <textarea 
              value={proposalText} 
              onChange={e => setProposalText(e.target.value)} 
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
            Your Rate ($)
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
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
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
} 