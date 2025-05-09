import React from 'react';

export default function LoadingSpinner({ size = 'medium' }) {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `3px solid #f3f6fb`,
        borderTop: `3px solid #0a66c2`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
} 