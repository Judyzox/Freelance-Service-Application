import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import ProfilePicture from './ProfilePicture';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfileForm() {
  const [profile, setProfile] = useState({ profileId: '', userId: '', bio: '', phone: '', skills: '', experience: '', cv: '', cvData: '' });
  const [user, setUser] = useState({ fullName: '', email: '', role: '', password: '' });
  const [cvName, setCvName] = useState('');
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef();
  const { setLoading, showToast } = useApp();

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      if (parsed.cv) setCvName(parsed.cv);
    }
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvName(file.name);
      const base64 = await fileToBase64(file);
      setProfile(prev => ({ ...prev, cv: file.name, cvData: base64 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const profileToSave = { ...profile };
      delete profileToSave.cvData;
      localStorage.setItem('profile', JSON.stringify(profileToSave));
      setEditing(false);
      showToast('Profile saved successfully!', 'success');
    } catch (error) {
      showToast('Error saving profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
        <ProfilePicture size="large" />
        <div>
          <h2 style={{ color: '#0a66c2', margin: 0 }}>{user.fullName}</h2>
          <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
        </div>
      </div>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Full Name
        <input 
          name="fullName" 
          value={user.fullName} 
          disabled 
          style={{ 
            background: '#f1f5f9',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }} 
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Email
        <input 
          name="email" 
          value={user.email} 
          disabled 
          style={{ 
            background: '#f1f5f9',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }} 
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Password
        <input 
          name="password" 
          value={user.password} 
          type="password" 
          disabled 
          style={{ 
            background: '#f1f5f9',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }} 
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Role
        <input 
          name="role" 
          value={user.role} 
          disabled 
          style={{ 
            background: '#f1f5f9',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem'
          }} 
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Phone
        <input 
          name="phone" 
          value={profile.phone} 
          onChange={handleChange} 
          disabled={!editing}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            background: editing ? 'white' : '#f1f5f9'
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Bio
        <textarea 
          name="bio" 
          value={profile.bio} 
          onChange={handleChange} 
          disabled={!editing}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            minHeight: '100px',
            resize: 'vertical',
            background: editing ? 'white' : '#f1f5f9'
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Skills
        <input 
          name="skills" 
          value={profile.skills} 
          onChange={handleChange} 
          disabled={!editing}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            background: editing ? 'white' : '#f1f5f9'
          }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        Experience
        <input 
          name="experience" 
          value={profile.experience} 
          onChange={handleChange} 
          disabled={!editing}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '1rem',
            background: editing ? 'white' : '#f1f5f9'
          }}
        />
      </label>
      {user.role === 'freelancer' && (
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          CV
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            disabled={!editing}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '1rem',
              background: editing ? 'white' : '#f1f5f9'
            }}
          />
          {cvName && profile.cvData && (
            <div style={{ marginTop: 8 }}>
              <a 
                href={profile.cvData} 
                download={cvName} 
                style={{ 
                  color: '#0a66c2',
                  textDecoration: 'none',
                  ':hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Download/View CV: {cvName}
              </a>
            </div>
          )}
        </label>
      )}
      {!editing ? (
        <button 
          type="button" 
          onClick={() => setEditing(true)}
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
            marginTop: '1rem'
          }}
        >
          Edit Profile
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
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
              flex: 1
            }}
          >
            Save Changes
          </button>
          <button 
            type="button"
            onClick={() => setEditing(false)}
            style={{
              background: '#f3f6fb',
              color: '#0a66c2',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #0a66c2',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              flex: 1
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
} 