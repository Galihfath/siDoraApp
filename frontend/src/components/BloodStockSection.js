import React from 'react';
import { VStack, Heading, Divider, SimpleGrid } from '@chakra-ui/react';
import StatisticsCard from '../components/StatisticsCard'; // Import komponen StatistikCard

// Data contoh stok darah
const bloodStockData = [
  { bloodType: 'A', quantity: 50 },
  { bloodType: 'B', quantity: 30 },
  { bloodType: 'AB', quantity: 20 },
  { bloodType: 'O', quantity: 60 },
];

const BloodStockSection = () => {
  return (
    <VStack spacing={8} mt={10} align="stretch">
      <Heading as="h3" size="lg" color="pmiRed.500" textAlign="center">
        Stok Darah Tersedia
      </Heading>
      <Divider borderColor="pmiRed.300" mb={4} />

      {/* Mengatur SimpleGrid dengan 2 kolom di layar medium dan 1 kolom di layar kecil */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} p={4}>
        {bloodStockData.map((stock, index) => (
          <StatisticsCard
            key={index}
            title={`${stock.quantity}  kantong`}
            value={`${stock.bloodType}`}
            color="pmiRed.500"
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default BloodStockSection;
