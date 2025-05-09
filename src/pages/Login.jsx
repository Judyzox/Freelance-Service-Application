import { useState } from 'react';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <div className="page-container">
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Welcome Back</h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
          Log in to access your account
        </p>
        <LoginForm />
      </div>
    </div>
  );
} 