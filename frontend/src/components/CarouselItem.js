// components/CarouselItem.js
import React from 'react';
import { Box, Image, Text, Button, VStack } from '@chakra-ui/react';

const CarouselItem = ({ image, alt, title, description, buttonLabel, onButtonClick }) => {
  return (
    <Box p={4} textAlign="center">
      {/* Gambar Carousel */}
      <Image src={image} alt={alt} mx="auto" borderRadius="md" boxShadow="lg" />

      {/* Konten Carousel */}
      <VStack mt={4} spacing={2}>
        <Text fontWeight="bold" color="gray.700" fontSize="2xl">
          {title}
        </Text>
        <Text color="gray.500" fontSize="lg">
          {description}
        </Text>
        
        {/* Tombol CTA (Call to Action) */}
        {buttonLabel && (
          <Button
            colorScheme="teal"
            size="md"
            onClick={onButtonClick}
            variant="solid"
            mt={4}
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
          >
            {buttonLabel}
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default CarouselItem;
