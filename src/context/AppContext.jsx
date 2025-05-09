import React, { createContext, useContext, useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedIn(true);
    } else {
      localStorage.removeItem('user');
      setLoggedIn(false);
    }
  }, [user]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <AppContext.Provider value={{ setLoading, showToast, user, setUser, loggedIn, setLoggedIn }}>
      {loading && <LoadingSpinner />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 