// src/DonorDashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Container, SimpleGrid } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import SyaratDonor from '../components/SyaratDonor';
import StatisticsCard from '../components/StatisticsCard';
import CardList from '../components/CardList';
import Timeline from '../components/Timeline';
import { useUser } from '../context/UserContext';
import fetchData from '../utils/fetchData'; // Import fetchData dari utils
import BloodStockSection from '../components/BloodStockSection';


function DonorDashboard() {
  const { userName } = useUser(); // Mengambil userName dari context
  const [donorData, setDonorData] = useState(null); // State untuk menyimpan data donor
  const [timelineEvents, setTimelineEvents] = useState([]); // State untuk menyimpan data timeline
  const [cardItems, setCardItems] = useState([]); // State untuk menyimpan data kartu

  // Fetch data donor dan lainnya saat komponen pertama kali dimuat
  useEffect(() => {
    const getDashboardData = async () => {
      try {
        // Mengambil data donor dari API menggunakan fetchData
        const donorResponse = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/donor-data');
        setDonorData(donorResponse); // Set data donor yang diterima ke state

        // Mengambil data timeline dari API
        const timelineResponse = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/timeline-events');
        setTimelineEvents(timelineResponse);

        // Mengambil data kartu dari API
        const cardResponse = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/card-items');
        setCardItems(cardResponse);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    getDashboardData();
  }, []);

  return (
    <Box>
      <Navbar /> {/* Menampilkan Navbar */}
      <Container maxW="container.lg" mt={10} p={4}>
        <Box bg="rgba(255, 255, 255, 0.8)" p={8} borderRadius="md" shadow="lg">
          <Heading as="h2" mb={6} textAlign="center" color="pmiRed.500">
            Hallo, {userName}! <br/>
            Selamat Datang di dashboard pendonor darah siDORA.
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
            <SyaratDonor /> {/* Gunakan komponen SyaratDonor */}
            <BloodStockSection />
          </SimpleGrid>
          
          {/* Menampilkan statistik donor */}
          {donorData && (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={6}>
              <StatisticsCard title="Total Donor" value={donorData.totalDonor} />
              <StatisticsCard title="Donor Terakhir" value={donorData.lastDonor} />
              <StatisticsCard title="Jumlah Acara Donor" value={donorData.totalEvents} />
            </SimpleGrid>
          )}

          {/* Menampilkan CardList */}
          <Heading as="h3" mt={8} mb={4} fontSize="2xl" color="pmiRed.500" textAlign="center">
            Informasi Acara Donor
          </Heading>
          <CardList items={cardItems} columns={3} />

          {/* Menampilkan Timeline */}
          <Heading as="h3" mt={8} mb={4} fontSize="2xl" color="pmiRed.500" textAlign="center">
            Riwayat Donor Darah
          </Heading>
          <Timeline events={timelineEvents} />
        </Box>
      </Container>
    </Box>
  );
}

export default DonorDashboard;
