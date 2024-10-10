// components/DatePickerField.js
import React from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const DatePickerField = ({ label, name, value, onChange }) => (
  <FormControl id={name}>
    <FormLabel>{label}</FormLabel>
    <Input type="date" name={name} value={value} onChange={onChange} />
  </FormControl>
);

export default DatePickerField;
