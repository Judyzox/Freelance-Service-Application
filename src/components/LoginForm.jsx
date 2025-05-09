import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const { setLoading, showToast } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) {
      showToast('Please select a role', 'error');
      return;
    }
    setLoading(true);
    try {
      // Check against all users with the selected role
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === form.email && u.password === form.password && u.role === form.role);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loggedIn', 'true');
        // Load profile for this user
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        if (profile.userId !== user.userId) {
          // If not matching, create a new profile for this user
          const profileId = 'p_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
          const newProfile = {
            profileId,
            userId: user.userId,
            bio: '',
            phone: '',
            skills: '',
            experience: '',
          };
          localStorage.setItem('profile', JSON.stringify(newProfile));
        }
        showToast('Login successful!', 'success');
        if (user.role === 'client') {
          navigate('/dashboard');
        } else if (user.role === 'freelancer') {
          navigate('/my-applications');
        } else {
          navigate('/');
        }
      } else {
        showToast('Invalid email, password, or role', 'error');
      }
    } catch (error) {
      showToast('An error occurred during login', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Role
        <select name="role" value={form.role} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '1rem' }}>
          <option value="">Select role</option>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Email
        <input 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            transition: 'border-color 0.2s',
            ':focus': {
              borderColor: '#0a66c2',
              outline: 'none'
            }
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Password
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            transition: 'border-color 0.2s',
            ':focus': {
              borderColor: '#0a66c2',
              outline: 'none'
            }
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
          ':hover': {
            background: '#004182'
          }
        }}
      >
        Sign In
      </button>
    </form>
  );
} 