import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { user, loggedIn, setUser, setLoggedIn, setLoading, showToast } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      setUser(null);
      setLoggedIn(false);
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('profile');
      localStorage.setItem('justLoggedOut', 'true');
      showToast('Logged out successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Error logging out', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav style={{ 
      background: 'white', 
      padding: '1rem 2rem',
      boxShadow: '0 2px 8px rgba(10,102,194,0.07)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <ul style={{ 
        display: 'flex', 
        alignItems: 'center', 
        margin: 0, 
        padding: 0, 
        listStyle: 'none',
        gap: '2rem'
      }}>
        <li>
          <Link to="/" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold',
            color: '#0a66c2',
            textDecoration: 'none'
          }}>
            FreelanceHub
          </Link>
        </li>
        {/* LOGGED OUT NAVBAR */}
        {!loggedIn && (
          <>
            <li style={{ marginLeft: 'auto' }}>
              <Link to="/" style={{ 
                color: '#0a66c2',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" style={{ 
                color: '#0a66c2',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ 
                background: '#0a66c2',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}>
                Login
              </Link>
            </li>
          </>
        )}
        {/* CLIENT NAVBAR */}
        {loggedIn && user?.role === 'client' && (
          <>
            <li style={{ marginLeft: 'auto' }}>
              <Link to="/feed" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Feed</Link>
            </li>
            <li>
              <Link to="/post-job" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Post Job</Link>
            </li>
            <li>
              <Link to="/dashboard" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/applications" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Applications</Link>
            </li>
            <li>
              <Link to="/profile" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Profile</Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#0a66c2', 
                  cursor: 'pointer', 
                  fontWeight: 500, 
                  transition: 'color 0.2s',
                  fontSize: '1rem'
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
        {/* FREELANCER NAVBAR */}
        {loggedIn && user?.role === 'freelancer' && (
          <>
            <li style={{ marginLeft: 'auto' }}>
              <Link to="/feed" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Feed</Link>
            </li>
            <li>
              <Link to="/my-applications" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>My Applications</Link>
            </li>
            <li>
              <Link to="/profile" style={{ color: '#0a66c2', textDecoration: 'none', transition: 'color 0.2s' }}>Profile</Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#0a66c2', 
                  cursor: 'pointer', 
                  fontWeight: 500, 
                  transition: 'color 0.2s',
                  fontSize: '1rem'
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
} 