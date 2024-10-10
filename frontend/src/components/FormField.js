// FormField.js
import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import InputField from './InputField';
import SelectField from './SelectField';

const FormField = ({ label, name, type = 'text', value, onChange, isSelect = false, options = [], placeholder = '' }) => (
  <FormControl id={name} isRequired>
    <FormLabel color="neutral.900" fontSize="sm" fontWeight="bold">
      {label}
    </FormLabel>
    {isSelect ? (
      <SelectField
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        borderColor="neutral.300"
        focusBorderColor="blueAccent.500"
        bg="white"
        _hover={{ borderColor: 'neutral.400' }}
      />
    ) : (
      <InputField
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        borderColor="neutral.300"
        focusBorderColor="blueAccent.500"
        bg="white"
        _hover={{ borderColor: 'neutral.400' }}
      />
    )}
  </FormControl>
);

export default FormField;
