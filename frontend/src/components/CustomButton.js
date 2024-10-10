// components/CustomButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ text, onClick, colorScheme = 'blue', variant = 'solid' }) => (
  <Button onClick={onClick} colorScheme={colorScheme} variant={variant}>
    {text}
  </Button>
);

export default CustomButton;