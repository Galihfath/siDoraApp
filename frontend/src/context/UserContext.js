// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Buat context
const UserContext = createContext();

// Buat provider untuk context
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState({
    userName: '',
    isLoggedIn: false,
    scrollMessage: 'Ayo Donor Darah! Jadwal Donor Darah Terdekat: 25 Sept 2024 di PMI Jakarta',
  });

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserState((prevState) => ({ ...prevState, userName: storedName, isLoggedIn: true }));
    }
  }, []);

  // Fungsi untuk login dan logout
  const handleLogin = (name) => {
    setUserState((prevState) => ({
      ...prevState,
      userName: name,
      isLoggedIn: true,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUserState({ userName: '', isLoggedIn: false, scrollMessage: userState.scrollMessage });
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ ...userState, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook untuk menggunakan UserContext
export const useUser = () => useContext(UserContext);
