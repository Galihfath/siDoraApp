import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const FormField = ({ label, name, type = 'text', value, onChange, isSelect = false, options = [] }) => (
  <FormControl id={name} isRequired>
    <FormLabel>{label}</FormLabel>
    {isSelect ? (
      <Select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    ) : (
      <Input name={name} type={type} value={value} onChange={onChange} />
    )}
  </FormControl>
);

export default FormField;
