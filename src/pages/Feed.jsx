import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Feed() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [liked, setLiked] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
    setJobs(JSON.parse(localStorage.getItem('jobs') || '[]'));
    if (u) {
      const userObj = JSON.parse(u);
      setLiked(JSON.parse(localStorage.getItem(`liked_${userObj.userId}`) || '[]'));
    }
  }, []);

  const handleLike = (jobId) => {
    if (!user) return;
    let newLiked = liked.includes(jobId)
      ? liked.filter(id => id !== jobId)
      : [...liked, jobId];
    setLiked(newLiked);
    localStorage.setItem(`liked_${user.userId}`, JSON.stringify(newLiked));
  };

  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  if (!user) {
    return <div className="page-container"><h2>Please <Link to="/login">sign in</Link> to view the job feed.</h2></div>;
  }

  return (
    <div className="page-container" style={{ background: 'linear-gradient(120deg, #f3f6fb 0%, #e9ecef 100%)', minHeight: '100vh' }}>
      <h1 style={{ color: '#0a66c2', fontWeight: 700, marginBottom: '2rem' }}>Job Feed</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {jobs.map(job => {
          let status = null;
          let offer = null;
          if (user.role === 'freelancer') {
            offer = (job.offers || []).find(o => o.freeLancerId === user.userId);
            status = offer ? offer.status : null;
          }
          let cardStyle = { background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(10,102,194,0.07)', padding: '2rem', minWidth: 320, maxWidth: 400, flex: '1 1 320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' };
          if (status === 'accepted') cardStyle.background = '#d1fae5';
          if (status === 'rejected') cardStyle.background = '#fee2e2';
          return (
            <div key={job.jobId} style={cardStyle}>
              <div>
                <h2 style={{ color: '#0a66c2', margin: 0 }}>{job.title}</h2>
                <p style={{ color: '#434649', margin: '1rem 0' }}>{job.description}</p>
                <p style={{ margin: 0 }}><b>Budget:</b> ${job.budget} &nbsp; <b>Deadline:</b> {job.deadline}</p>
                <p style={{ margin: '0.5rem 0 0 0', color: '#888' }}><b>Posted by:</b> {job.postedBy}</p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button onClick={() => handleLike(job.jobId)} className={liked.includes(job.jobId) ? 'linkedin-btn linkedin-btn-primary' : 'linkedin-btn linkedin-btn-secondary'}>
                    {liked.includes(job.jobId) ? 'Liked' : 'Like'}
                  </button>
                  {user.role === 'freelancer' && !status && (
                    <button onClick={() => handleApply(job.jobId)} className="linkedin-btn linkedin-btn-primary">Apply</button>
                  )}
                  {user.role === 'freelancer' && status && (
                    <span style={{ fontWeight: 600, color: status === 'accepted' ? '#059669' : status === 'rejected' ? '#dc2626' : '#0a66c2' }}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  )}
                </div>
                {user.role === 'freelancer' && offer && offer.proposalText && (
                  <div style={{ marginTop: 8, color: '#555', fontStyle: 'italic' }}>
                    <b>Your Message:</b> {offer.proposalText}<br />
                    <b>Your Rate:</b> ${offer.amount}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 