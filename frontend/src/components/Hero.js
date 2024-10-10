// components/Hero.js
import React from 'react';
import { Box, Heading, Text, Button, Image, Stack } from '@chakra-ui/react';

const Hero = ({ title, subtitle, imageUrl, buttonText, onButtonClick }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      backgroundImage={`url(${imageUrl})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      textAlign="center"
      color="white"
      px={8}
    >
      <Box
        bg="rgba(0, 0, 0, 0.6)"
        p={8}
        borderRadius="md"
        maxW="lg"
        boxShadow="lg"
      >
        <Stack spacing={4}>
          <Heading as="h1" size="xl" fontWeight="bold">
            {title}
          </Heading>
          <Text fontSize="lg">{subtitle}</Text>
          <Button
            onClick={onButtonClick}
            colorScheme="teal"
            variant="solid"
            size="lg"
            mt={4}
          >
            {buttonText}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Hero;
