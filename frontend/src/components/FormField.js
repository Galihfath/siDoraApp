// FormField.js
import React from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const FormField = ({ label, name, type = 'text', value, onChange, isSelect = false, options = [], placeholder = '' }) => (
  <FormControl id={name} isRequired>
    <FormLabel color="neutral.900" fontSize="sm" fontWeight="bold">
      {label}
    </FormLabel>
    {isSelect ? (
      <Select
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        borderColor="neutral.300"
        focusBorderColor="blueAccent.500"
        bg="white"
        _hover={{ borderColor: "neutral.400" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    ) : (
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        borderColor="neutral.300"
        focusBorderColor="blueAccent.500"
        bg="white"
        _hover={{ borderColor: "neutral.400" }}
      />
    )}
  </FormControl>
);

export default FormField;
