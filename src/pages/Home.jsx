import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('justLoggedOut') === 'true') {
      setLoggedOut(true);
      localStorage.removeItem('justLoggedOut');
    }
  }, []);
  return (
    <div className="linkedin-home-bg">
      {loggedOut && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem', textAlign: 'center' }}>
          Logged out
        </div>
      )}
      <div className="linkedin-hero-container">
        <div className="linkedin-hero-left">
          <h1 className="linkedin-hero-title">Welcome to FreelanceHub</h1>
          <p className="linkedin-hero-desc">
            Connect with top freelancers and clients. Post jobs, find work, and grow your career or business—all in one place.
          </p>
          <div className="linkedin-hero-cta">
            <Link to="/register" className="linkedin-btn linkedin-btn-primary">Join Now</Link>
            <Link to="/login" className="linkedin-btn linkedin-btn-secondary">Sign In</Link>
          </div>
        </div>
        <div className="linkedin-hero-right">
          <img src="/freelancer.webp" alt="FreelanceHub illustration" className="linkedin-hero-img" />
        </div>
      </div>
    </div>
  );
} 