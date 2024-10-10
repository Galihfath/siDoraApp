// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Buat context
const UserContext = createContext();

// Buat provider untuk context
export const UserProvider = ({ children }) => {
  const navigate = useNavigate(); // Menggunakan useNavigate dari react-router-dom
  const [userState, setUserState] = useState({
    userName: '',
    scrollMessage: 'Ayo Donor Darah! Jadwal Donor Darah Terdekat: 25 Sept 2024 di PMI Jakarta',
  });

  // Mengambil nama pengguna dari localStorage saat pertama kali komponen di-mount
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserState((prevState) => ({ ...prevState, userName: storedName }));
    }
  }, []);

  // Fungsi untuk logout dan membersihkan localStorage
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUserState({ userName: '', scrollMessage: userState.scrollMessage });
    navigate('/login'); // Navigasi ke halaman login setelah logout
  };

  return (
    <UserContext.Provider value={{ ...userState, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook untuk menggunakan UserContext
export const useUser = () => useContext(UserContext);
