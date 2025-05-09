import React, { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = {
    success: '#d1fae5',
    error: '#fee2e2',
    info: '#f3f6fb'
  }[type];

  const textColor = {
    success: '#065f46',
    error: '#dc2626',
    info: '#0a66c2'
  }[type];

  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      padding: '1rem 1.5rem',
      background: bgColor,
      color: textColor,
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: textColor,
          cursor: 'pointer',
          padding: '0.25rem',
          marginLeft: '0.5rem',
          opacity: 0.7,
          transition: 'opacity 0.2s'
        }}
        onMouseOver={e => e.target.style.opacity = 1}
        onMouseOut={e => e.target.style.opacity = 0.7}
      >
        ×
      </button>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
} 