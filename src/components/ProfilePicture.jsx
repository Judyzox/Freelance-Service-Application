import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ProfilePicture({ size = 'medium', onImageChange }) {
  const [image, setImage] = useState(localStorage.getItem('profilePicture') || null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef();
  const { setLoading, showToast } = useApp();

  const sizeMap = {
    small: '3rem',
    medium: '5rem',
    large: '8rem'
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast('Image size should be less than 5MB', 'error');
        return;
      }
      setLoading(true);
      try {
        const base64 = await fileToBase64(file);
        setImage(base64);
        localStorage.setItem('profilePicture', base64);
        onImageChange?.(base64);
        showToast('Profile picture updated successfully', 'success');
      } catch (error) {
        showToast('Error uploading image', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        background: image ? 'none' : '#f3f6fb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0a66c2',
        fontSize: size === 'small' ? '1.5rem' : size === 'medium' ? '2rem' : '3rem',
        fontWeight: 600
      }}
      onClick={handleImageClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <img 
          src={image} 
          alt="Profile" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      ) : (
        '👤'
      )}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          Change Photo
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
} 