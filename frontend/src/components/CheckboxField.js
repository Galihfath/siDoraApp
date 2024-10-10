// components/CheckboxField.js
import React from 'react';
import { Checkbox, FormControl, FormLabel } from '@chakra-ui/react';

const CheckboxField = ({ label, name, isChecked, onChange }) => (
  <FormControl id={name}>
    <FormLabel>{label}</FormLabel>
    <Checkbox name={name} isChecked={isChecked} onChange={onChange}>
      {label}
    </Checkbox>
  </FormControl>
);

export default CheckboxField;
