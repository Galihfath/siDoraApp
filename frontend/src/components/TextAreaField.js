// components/TextAreaField.js
import React from 'react';
import { Textarea, FormControl, FormLabel } from '@chakra-ui/react';

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <FormControl id={name}>
    <FormLabel>{label}</FormLabel>
    <Textarea name={name} value={value} onChange={onChange} placeholder={placeholder} />
  </FormControl>
);

export default TextAreaField;
