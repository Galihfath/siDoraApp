// src/pages/HomePage.js
import React from 'react';
import { Box, Container, Heading, VStack, Divider, SimpleGrid } from '@chakra-ui/react';
import Footer from '../components/Footer';
import SyaratDonor from '../components/SyaratDonor';
import Carousel from '../components/Carousel';
import CardList from '../components/CardList';
import BloodStockSection from '../components/BloodStockSection';



// Data untuk komponen Card
const cardItems = [
  { image: 'https://via.placeholder.com/150', title: 'Ayo Donor Darah!', description: 'Menyumbangkan darah adalah tindakan yang mulia.' },
  { image: 'https://via.placeholder.com/150', title: 'Jadwal Donor', description: 'Lihat jadwal donor darah terdekat di kota Anda.' },
];

function HomePage() {
  return (
    <Box bg="rgba(255, 255, 255, 0.5)" minHeight="100vh" py={10}>
      <Container maxW="container.lg">
        {/* Konten utama halaman */}
        <Box bg="white" p={8} rounded="md" shadow="lg" mb={10}>
          <Heading as="h2" mb={6} textAlign="center" color="pmiRed.500">
            Selamat Datang di siDORA
          </Heading>
          <Carousel />
          <Box height="20px" />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
            <SyaratDonor /> {/* Gunakan komponen SyaratDonor */}
            <BloodStockSection />
          </SimpleGrid>
        </Box>

        {/* Bagian Card untuk informasi tambahan */}
        <VStack spacing={8} mt={10} align="stretch">
          <Heading as="h3" size="lg" color="pmiRed.500" textAlign="center">
            Artikel dan Informasi Donor Darah
          </Heading>
          <Divider borderColor="pmiRed.300" mb={4} />
          {/* Gunakan komponen Card */}
            <CardList items={cardItems} />
        </VStack>

        {/* Gunakan komponen Footer */}
        <Footer />
      </Container>
    </Box>
  );
}

export default HomePage;
