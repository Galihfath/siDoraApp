// src/components/Header.js
import React from 'react';
import { HStack, Heading, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HStack mb={8} p={4}>
      <Heading as="h1" color="pmiRed.500" fontWeight="bold" size="lg">
        siDORA
      </Heading>
      <Spacer />
      <Link to="/login">
        <Button colorScheme="pmiRed" variant="outline" size="md">
          Login
        </Button>
      </Link>
    </HStack>
  );
};

export default Header;
