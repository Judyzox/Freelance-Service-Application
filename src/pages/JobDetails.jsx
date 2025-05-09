import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function OfferForm({ jobId, onOffer }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onOffer({ amount, message, status: 'pending', id: Date.now() });
    setAmount('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <label>Offer Amount
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      </label>
      <label>Message
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
      </label>
      <button type="submit">Submit Offer</button>
    </form>
  );
}

function OfferList({ offers }) {
  if (!offers?.length) return <p>No offers yet.</p>;
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Offers</h3>
      <ul>
        {offers.map(offer => (
          <li key={offer.id}>
            <b>${offer.amount}</b> - {offer.message} <span style={{ color: '#64748b' }}>({offer.status})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobDetails() {
  const { id } = useParams(); // id is jobId
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    setJob(jobs.find(j => String(j.jobId) === String(id)));
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  }, [id]);

  const handleOffer = (offer) => {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const idx = jobs.findIndex(j => String(j.jobId) === String(id));
    if (idx !== -1) {
      jobs[idx].offers = jobs[idx].offers || [];
      jobs[idx].offers.push(offer);
      localStorage.setItem('jobs', JSON.stringify(jobs));
      setJob({ ...jobs[idx] });
    }
  };

  if (!job || !user) return <p>Loading...</p>;

  let myOffer = null;
  if (user.role === 'freelancer') {
    myOffer = (job.offers || []).find(o => o.freeLancerId === user.userId);
  }

  return (
    <div className="page-container">
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p><b>Budget:</b> ${job.budget} &nbsp; <b>Deadline:</b> {job.deadline}</p>
      <p><b>Status:</b> {job.status}</p>
      <p><b>Posted by:</b> {job.postedBy}</p>
      <p><b>Created at:</b> {job.createdAt}</p>
      {user.role === 'freelancer' && myOffer && (
        <div style={{ marginTop: 16, padding: 12, background: myOffer.status === 'accepted' ? '#d1fae5' : myOffer.status === 'rejected' ? '#fee2e2' : '#f3f6fb', borderRadius: 8 }}>
          <b>Your Application:</b><br />
          <b>Proposal:</b> {myOffer.proposalText}<br />
          <b>Amount:</b> ${myOffer.amount}<br />
          <b>Status:</b> <span style={{ color: myOffer.status === 'accepted' ? '#059669' : myOffer.status === 'rejected' ? '#dc2626' : '#0a66c2' }}>{myOffer.status.charAt(0).toUpperCase() + myOffer.status.slice(1)}</span><br />
          <b>Submitted at:</b> {myOffer.createdAt}
        </div>
      )}
      {user.role === 'client' && (
        <div style={{ marginTop: 24 }}>
          <h3>Offers for this Job</h3>
          {(!job.offers || job.offers.length === 0) && <p>No offers yet.</p>}
          <ul>
            {job.offers && job.offers.map(offer => (
              <li key={offer.offerId} style={{ marginBottom: 12, background: offer.status === 'accepted' ? '#d1fae5' : offer.status === 'rejected' ? '#fee2e2' : '#f3f6fb', borderRadius: 8, padding: 8 }}>
                <b>Freelancer ID:</b> {offer.freeLancerId}<br />
                <b>Proposal:</b> {offer.proposalText}<br />
                <b>Amount:</b> ${offer.amount}<br />
                <b>Status:</b> <span style={{ color: offer.status === 'accepted' ? '#059669' : offer.status === 'rejected' ? '#dc2626' : '#0a66c2' }}>{offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}</span><br />
                <b>Submitted at:</b> {offer.createdAt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 