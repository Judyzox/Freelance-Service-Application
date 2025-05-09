import { useState } from 'react';

function generateId() {
  return 'u_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

export default function ClientRegisterForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    skills: '',
    experience: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = generateId();
    const createdAt = new Date().toISOString();
    const user = { ...form, userId, createdAt, role: 'client' };
    // Store in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
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
    };
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Client registered!');
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Register as Client</h2>
      <label>Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} required />
      </label>
      <label>Email
        <input name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>Password
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
      </label>
      <label>Phone
        <input name="phone" value={form.phone} onChange={handleChange} />
      </label>
      <label>Bio
        <textarea name="bio" value={form.bio} onChange={handleChange} />
      </label>
      <label>Skills
        <input name="skills" value={form.skills} onChange={handleChange} />
      </label>
      <label>Experience
        <input name="experience" value={form.experience} onChange={handleChange} />
      </label>
      <button type="submit" className="linkedin-btn linkedin-btn-primary">Register</button>
    </form>
  );
} 