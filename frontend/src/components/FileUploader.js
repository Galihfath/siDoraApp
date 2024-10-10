// components/FileUploader.js
import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

const FileUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : '');
    if (onUpload && file) onUpload(file);
  };

  return (
    <Box textAlign="center" p={4} borderWidth="1px" borderRadius="md" borderColor="gray.300">
      <Input type="file" onChange={handleFileChange} display="none" id="file-input" />
      <label htmlFor="file-input">
        <Button as="span" colorScheme="teal" mb={2}>
          Pilih File
        </Button>
      </label>
      {fileName && <Text mt={2}>File: {fileName}</Text>}
    </Box>
  );
};

export default FileUploader;
