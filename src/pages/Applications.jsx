import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setLoading, showToast } = useApp();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(u);
    setJobs(JSON.parse(localStorage.getItem('jobs') || '[]'));
    if (u.role !== 'client') navigate('/');
  }, [navigate]);

  const handleOfferStatus = async (jobId, offerId, status) => {
    setLoading(true);
    try {
      const updatedJobs = jobs.map(job => {
        if (job.jobId === jobId) {
          job.offers = job.offers.map(offer =>
            offer.offerId === offerId ? { ...offer, status } : offer
          );
        }
        return job;
      });
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      showToast(`Application ${status} successfully`, 'success');
    } catch (error) {
      showToast('Error updating application status', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Only show jobs posted by this client
  const clientJobs = jobs.filter(job => job.clientId === (user && user.userId));
  const allOffers = clientJobs.flatMap(job => (job.offers || []).map(offer => ({ ...offer, job })));

  return (
    <div className="page-container">
      <h1 style={{ color: '#0a66c2', marginBottom: '2rem' }}>Job Applications</h1>
      {allOffers.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center' }}>No applications yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {allOffers.map(({ offerId, job, freeLancerId, proposalText, amount, status, createdAt }) => (
            <div 
              key={offerId} 
              style={{ 
                background: status === 'accepted' ? '#d1fae5' : status === 'rejected' ? '#fee2e2' : '#f3f6fb',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(10,102,194,0.07)'
              }}
            >
              <h3 style={{ margin: '0 0 1rem 0', color: '#0a66c2' }}>{job.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <p style={{ margin: 0 }}><b>Freelancer ID:</b> {freeLancerId}</p>
                <p style={{ margin: 0 }}><b>Proposal:</b> {proposalText}</p>
                <p style={{ margin: 0 }}><b>Amount:</b> ${amount}</p>
                <p style={{ margin: 0 }}>
                  <b>Status:</b>{' '}
                  <span style={{ 
                    color: status === 'accepted' ? '#059669' : 
                           status === 'rejected' ? '#dc2626' : 
                           '#0a66c2',
                    fontWeight: 600
                  }}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </p>
                <p style={{ margin: 0, color: '#64748b' }}><b>Submitted at:</b> {new Date(createdAt).toLocaleString()}</p>
              </div>
              {status === 'pending' && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => handleOfferStatus(job.jobId, offerId, 'accepted')}
                    style={{
                      background: '#059669',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleOfferStatus(job.jobId, offerId, 'rejected')}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 