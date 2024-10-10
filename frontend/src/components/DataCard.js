// components/DataCard.js
import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

const DataCard = ({ label, value, icon }) => (
  <Box
    borderRadius="md"
    boxShadow="lg"
    bg="white"
    textAlign="center"
    p={6}
    border="1px solid"
    borderColor="gray.200"
    _hover={{ boxShadow: 'xl' }}
  >
    {icon && <Box mb={4}>{icon}</Box>}
    <Heading size="2xl" color="teal.500">
      {value}
    </Heading>
    <Text mt={2} fontSize="lg" color="gray.500">
      {label}
    </Text>
  </Box>
);

export default DataCard;
