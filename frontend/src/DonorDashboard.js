// src/DonorDashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import SyaratDonor from './components/SyaratDonor';
import { useUser } from './context/UserContext';
import fetchData from './utils/fetchData'; // Import fetchData dari utils


function DonorDashboard() {
  const { userName } = useUser(); // Mengambil userName dari context
  const [donorData, setDonorData] = useState(null); // State untuk menyimpan data donor

  // Fetch data donor darah saat komponen pertama kali dimuat
  useEffect(() => {
    const getDonorData = async () => {
      try {
        // Mengambil data donor dari API menggunakan fetchData
        const data = await fetchData('https://example.com/api/donor-data');
        setDonorData(data); // Set data donor yang diterima ke state
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    getDonorData();
  }, []);

  return (
    <Box>
      <Navbar /> {/* Menampilkan Navbar */}
      <Container maxW="container.lg" mt={10} p={4}>
      <Box bg="rgba(255, 255, 255, 0.8)" p={8} borderRadius="md" shadow="lg">
          <Heading as="h2" mb={6} textAlign="center" color="pmiRed.500">
            Hallo, {userName}! Selamat Datang di dashboard pendonor darah siDORA.
          </Heading>
          <Text fontSize="lg" mb={6} textAlign="center" color="neutral.700">
            Berikut adalah informasi mengenai persyaratan untuk menjadi donor darah:
          </Text>
          <SyaratDonor /> {/* Menampilkan syarat donor */}
          {/* Menampilkan data donor jika ada */}
          {donorData && (
            <Box mt={6}>
              <Text>Jumlah Donor: {donorData.totalDonor}</Text>
              <Text>Donor Terakhir: {donorData.lastDonor}</Text>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default DonorDashboard;
