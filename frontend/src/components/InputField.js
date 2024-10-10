// components/InputField.js
import React from 'react';
import { Input } from '@chakra-ui/react';

const InputField = ({ name, type, value, onChange, placeholder, borderColor, focusBorderColor, bg, _hover }) => (
  <Input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    borderColor={borderColor}
    focusBorderColor={focusBorderColor}
    bg={bg}
    _hover={_hover}
  />
);

export default InputField;
