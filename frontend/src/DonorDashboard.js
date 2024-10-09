// DonorDashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SyaratDonor from './components/SyaratDonor';

function DonorDashboard() {
  // Pesan scroll dan nama user diambil dari local storage
  const [scrollMessage] = useState('Ayo Donor Darah! Jadwal Donor Darah Terdekat: 25 Sept 2024 di PMI Jakarta');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Mengambil nama user dari local storage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Fungsi untuk handle logout dan menghapus data dari local storage
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <Box bg="neutral.50" minHeight="100vh"> {/* Latar belakang dashboard */}
      {/* Navbar dengan scroll message */}
      <Navbar scrollMessage={scrollMessage} handleLogout={handleLogout} userName={userName} />

      {/* Isi Konten Dashboard */}
      <Container maxW="container.lg" mt={10} p={4}>
        <Box bg="white" p={8} borderRadius="md" shadow="lg">
          <Heading as="h2" mb={6} textAlign="center" color="pmiRed.500">
            Hallo, {userName}! Selamat Datang di dashboard pendonor darah siDORA.
          </Heading>
          <Text fontSize="lg" mb={6} textAlign="center" color="neutral.700">
            Berikut adalah informasi mengenai persyaratan untuk menjadi donor darah:
          </Text>
          <SyaratDonor /> {/* Komponen syarat donor darah */}
        </Box>
      </Container>
    </Box>
  );
}

export default DonorDashboard;
