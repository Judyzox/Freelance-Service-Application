import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem('jobs') || '[]'));
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  }, []);

  if (!jobs.length) return <p>No jobs posted yet.</p>;

  // For freelancers, show only jobs they applied for
  let filteredJobs = jobs;
  if (user && user.role === 'freelancer') {
    filteredJobs = jobs.filter(job => (job.offers || []).some(o => o.freeLancerId === user.userId));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {filteredJobs.map(job => {
        let status = null;
        let offer = null;
        if (user && user.role === 'freelancer') {
          offer = (job.offers || []).find(o => o.freeLancerId === user.userId);
          status = offer ? offer.status : null;
        }
        let cardStyle = { background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(10,102,194,0.07)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' };
        if (status === 'accepted') cardStyle.background = '#d1fae5';
        if (status === 'rejected') cardStyle.background = '#fee2e2';
        return (
          <div key={job.jobId} style={cardStyle}>
            <h2 style={{ margin: 0 }}>{job.title}</h2>
            <p>{job.description}</p>
            <p><b>Budget:</b> ${job.budget} &nbsp; <b>Deadline:</b> {job.deadline}</p>
            <p style={{ color: '#888', margin: 0 }}><b>Posted by:</b> {job.postedBy}</p>
            {user && user.role === 'freelancer' && status && (
              <span style={{ fontWeight: 600, color: status === 'accepted' ? '#059669' : status === 'rejected' ? '#dc2626' : '#0a66c2' }}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            )}
            {user && user.role === 'freelancer' && offer && offer.proposalText && (
              <div style={{ color: '#555', fontStyle: 'italic' }}>
                <b>Your Message:</b> {offer.proposalText}<br />
                <b>Your Rate:</b> ${offer.amount}
              </div>
            )}
            <Link to={`/jobs/${job.jobId}`}>View Details</Link>
          </div>
        );
      })}
    </div>
  );
} 