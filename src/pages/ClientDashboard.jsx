import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(u);
    setJobs(JSON.parse(localStorage.getItem('jobs') || '[]'));
    if (u.role !== 'client') navigate('/');
  }, [navigate]);

  const handleOfferStatus = (jobId, offerId, status) => {
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
  };

  // Only show jobs posted by this client
  const clientJobs = jobs.filter(job => job.clientId === (user && user.userId));

  return (
    <div className="page-container">
      <h1>Client Dashboard</h1>
      {clientJobs.length === 0 && <p>No jobs posted yet.</p>}
      {clientJobs.map(job => (
        <div key={job.jobId} style={{ background: 'white', marginBottom: '2rem', padding: '1.5rem', borderRadius: 8 }}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <h3>Offers</h3>
          {(!job.offers || job.offers.length === 0) && <p>No offers yet.</p>}
          <ul>
            {job.offers && job.offers.map(offer => (
              <li key={offer.offerId}>
                <b>${offer.amount}</b> - {offer.proposalText} <span style={{ color: '#64748b' }}>({offer.status})</span>
                {offer.status === 'pending' && (
                  <>
                    <button style={{ marginLeft: 8 }} onClick={() => handleOfferStatus(job.jobId, offer.offerId, 'accepted')}>Accept</button>
                    <button style={{ marginLeft: 8 }} onClick={() => handleOfferStatus(job.jobId, offer.offerId, 'rejected')}>Reject</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
} 