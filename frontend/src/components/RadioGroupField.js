// components/RadioGroupField.js
import React from 'react';
import { Radio, RadioGroup, FormControl, FormLabel, Stack } from '@chakra-ui/react';

const RadioGroupField = ({ label, name, value, onChange, options = [] }) => (
  <FormControl id={name}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup name={name} value={value} onChange={onChange}>
      <Stack direction="row">
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  </FormControl>
);

export default RadioGroupField;
