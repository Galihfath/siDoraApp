// components/StatisticsCard.js
import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

const StatisticsCard = ({ title, value, color }) => {
  return (
    <Box
      p={4}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      textAlign="center"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ boxShadow: 'lg' }}
    >
      <Heading size="lg" color={color}>
        {value}
      </Heading>
      <Text fontSize="md" fontWeight="bold" mt={2} color="gray.600">
        {title}
      </Text>
    </Box>
  );
};

export default StatisticsCard;
