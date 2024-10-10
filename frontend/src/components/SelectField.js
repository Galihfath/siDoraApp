// components/SelectField.js
import React from 'react';
import { Select } from '@chakra-ui/react';

const SelectField = ({ name, value, onChange, options, placeholder, borderColor, focusBorderColor, bg, _hover }) => (
  <Select
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    borderColor={borderColor}
    focusBorderColor={focusBorderColor}
    bg={bg}
    _hover={_hover}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);

export default SelectField;
