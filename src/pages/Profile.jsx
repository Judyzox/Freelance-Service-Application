import ProfileForm from '../components/ProfileForm';

export default function Profile() {
  return (
    <div className="page-container" style={{ display: 'flex', minHeight: '80vh', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f3f6fb 0%, #e9ecef 100%)' }}>
      <div style={{ flex: 1, textAlign: 'left', paddingLeft: '5vw' }}>
        <h1 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: '2rem' }}>My Profile</h1>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 16px rgba(10,102,194,0.07)', padding: '2.5rem 2rem', minWidth: 320, maxWidth: 500, width: '100%' }}>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
} 