import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SyaratDonor from './components/SyaratDonor';

function DonorDashboard() {
  const [scrollMessage] = useState('Ayo Donor Darah! Jadwal Donor Darah Terdekat: 25 Sept 2024 di PMI Jakarta');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <Box>
      <Navbar scrollMessage={scrollMessage} handleLogout={handleLogout} />
      
      {/* Isi Konten Dashboard */}
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" mb={4} textAlign="center" color="teal.500">
          Hallo, {userName}! Selamat Datang di dashboard pendonor darah siDORA.
        </Heading>
        <Text fontSize="lg" mb={4} textAlign="center">
          Berikut adalah informasi mengenai persyaratan untuk menjadi donor darah:
        </Text>
        <SyaratDonor />
      </Box>
    </Box>
  );
}

export default DonorDashboard;
