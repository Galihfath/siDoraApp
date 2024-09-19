import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';  // Tambahkan useNavigate

function Register() {
  const [name, setName] = useState('');  // State untuk nama lengkap
  const [username, setUsername] = useState('');  // State untuk username
  const [email, setEmail] = useState('');  // State untuk email
  const [password, setPassword] = useState('');  // State untuk password
  const toast = useToast();  // Untuk menampilkan notifikasi
  const navigate = useNavigate();  // Untuk navigasi ke halaman lain

  // Fungsi untuk menangani form submit
  const handleRegister = async (e) => {
    e.preventDefault();  // Mencegah reload halaman
    console.log("Submitting registration data:", { name, username, email, password }); // Log data yang akan dikirim
    try {
        const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, username, email, password }),
        });
    
        console.log("Response status:", response.status); // Log status respons
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Registration successful', data);
    
        toast({
          title: 'Registration successful.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
    
        setTimeout(() => {
          navigate('/login'); // Navigasi ke halaman login
        }, 2000);
    
      } catch (error) {
        console.error('Error during registration:', error);
        toast({
          title: 'Error registering.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.100">
      <Box bg="white" p={6} rounded="md" shadow="md" width="400px">
        <Heading mb={6} textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleRegister}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}  // Set nilai nama lengkap
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Set nilai username
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Set nilai email
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Set nilai password
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full">
              Register
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'teal', fontWeight: 'bold' }}>
            Login here
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Register;
