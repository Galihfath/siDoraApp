// src/components/Footer.js
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box textAlign="center" mt={10} color="neutral.700">
      <Text>&copy; {new Date().getFullYear()} siDORA. All Rights Reserved.</Text>
    </Box>
  );
};

export default Footer;
