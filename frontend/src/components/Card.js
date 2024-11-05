// components/Card.js
import React from 'react';
import { Box, Text, Heading, Stack, Image } from '@chakra-ui/react';

const Card = ({ title, description, imageUrl, altText, footer }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg="white"
      _hover={{ boxShadow: 'lg' }}
    >
      {imageUrl && <Image src={imageUrl} alt={altText} borderRadius="md" />}
      <Stack mt={4} spacing={2}>
        <Heading size="md" color="gray.700">
          {title}
        </Heading>
        <Text color="gray.500">{description}</Text>
      </Stack>
      {footer && (
        <Box mt={4} pt={2} borderTop="1px solid" borderColor="gray.200">
          {footer}
        </Box>
      )}
    </Box>
  );
};

export default Card;
