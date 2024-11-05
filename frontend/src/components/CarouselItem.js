// src/components/CarouselItem.js
import React from 'react';
import { Box, Image, Heading, Text, Button, VStack } from '@chakra-ui/react';

const CarouselItem = ({ image, alt, title, description, buttonLabel, onButtonClick }) => {
  return (
    <Box position="relative" w="full" h="300px">
      <Image src={image} alt={alt} w="full" h="full" objectFit="cover" />
      <VStack
        position="absolute"
        bottom="5%"
        left="50%"
        transform="translate(-50%, -0 )"
        color="white"
        bg="rgba(0, 0, 0, 0.5)"
        p={4}
        borderRadius="md"
        textAlign="center"
        spacing={4}
        justifyContent="flex-end"
      >
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm">{description}</Text>
        <Button onClick={onButtonClick} colorScheme="teal" size="sm">
          {buttonLabel}
        </Button>
      </VStack>
    </Box>
  );
};

export default CarouselItem;
