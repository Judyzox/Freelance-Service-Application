import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function generateId() {
  return 'u_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    skills: '',
    experience: '',
    cv: '',
    cvData: '',
    role: '',
  });
  const fileInputRef = useRef();
  const { setLoading, showToast } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast('CV file size should be less than 5MB', 'error');
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        setForm(prev => ({ ...prev, cv: file.name, cvData: base64 }));
      } catch (err) {
        showToast('Error reading CV file', 'error');
        console.error('CV file read error:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) {
      showToast('Please select a role', 'error');
      return;
    }
    if (form.role === 'freelancer' && !form.cv) {
      showToast('CV is required for freelancers', 'error');
      return;
    }
    setLoading(true);
    try {
      const userId = generateId();
      const createdAt = new Date().toISOString();
      const user = { ...form, userId, createdAt };
      delete user.cvData;
      // Always ensure users array exists and is valid
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('users'));
        if (!Array.isArray(users)) users = [];
      } catch (err) {
        users = [];
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('loggedIn', 'true');
      // Create profile
      const profileId = 'p_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
      const profile = {
        profileId,
        userId,
        bio: form.bio,
        phone: form.phone,
        skills: form.skills,
        experience: form.experience,
        cv: form.cv,
      };
      localStorage.setItem('profile', JSON.stringify(profile));
      // Debug log
      console.log('User registered:', user);
      console.log('All users after save:', JSON.parse(localStorage.getItem('users')));
      showToast('Registration successful!', 'success');
      if (form.role === 'client') {
        navigate('/dashboard');
      } else {
        navigate('/my-applications');
      }
    } catch (error) {
      showToast('Error during registration', 'error');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '3rem auto', background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(10,102,194,0.07)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#0a66c2' }}>Register</h2>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Role
        <select name="role" value={form.role} onChange={handleChange} required style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '1rem' }}>
          <option value="">Select role</option>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} required />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Email
        <input name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Password
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Phone
        <input name="phone" value={form.phone} onChange={handleChange} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Bio
        <textarea name="bio" value={form.bio} onChange={handleChange} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Skills
        <input name="skills" value={form.skills} onChange={handleChange} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        Experience
        <input name="experience" value={form.experience} onChange={handleChange} />
      </label>
      {form.role === 'freelancer' && (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          CV
          <input type="file" accept=".pdf,.doc,.docx" ref={fileInputRef} onChange={handleFileChange} required={form.role === 'freelancer'} />
          {form.cv && (
            <div style={{ marginTop: 8 }}>
              <span style={{ color: '#2563eb' }}>Uploaded: {form.cv}</span>
            </div>
          )}
        </label>
      )}
      <button type="submit" className="linkedin-btn linkedin-btn-primary">Register</button>
    </form>
  );
} 