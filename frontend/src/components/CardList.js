// components/CardList.js
import React from 'react';
import { Box, SimpleGrid, Text, Image, VStack } from '@chakra-ui/react';

// Komponen CardItem untuk menampilkan setiap item dalam CardList
const CardItem = ({ image, title, description }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      _hover={{ boxShadow: 'xl' }}
    >
      <Image src={image} alt={title} />

      <Box p={4}>
        <VStack spacing={2} align="stretch">
          <Text fontWeight="bold" fontSize="xl" color="blue.600">
            {title}
          </Text>
          <Text fontSize="md" color="gray.600">
            {description}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

// Komponen CardList untuk menampilkan beberapa CardItem
const CardList = ({ items = [], columns = 3 }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: columns }} spacing={6} p={4}>
      {items.map((item, index) => (
        <CardItem
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </SimpleGrid>
  );
};

export default CardList;
