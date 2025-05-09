import { useEffect, useState } from 'react';

export default function MyApplications() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem('jobs') || '[]'));
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  }, []);

  if (!user || user.role !== 'freelancer') {
    return <div className="page-container"><h2>You must be logged in as a freelancer to view your applications.</h2></div>;
  }

  // Find all offers by this freelancer
  const myOffers = jobs.flatMap(job =>
    (job.offers || [])
      .filter(offer => offer.freeLancerId === user.userId)
      .map(offer => ({ ...offer, job }))
  );

  return (
    <div className="page-container">
      <h1 style={{ color: '#0a66c2', marginBottom: '2rem' }}>My Applications</h1>
      {myOffers.length === 0 ? (
        <p style={{ color: '#64748b', textAlign: 'center' }}>You have not applied to any jobs yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {myOffers.map(({ offerId, job, proposalText, amount, status, createdAt }) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 