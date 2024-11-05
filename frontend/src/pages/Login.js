// src/Login.js
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
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import useUser dari UserContext

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { handleLogin } = useUser(); // Ambil handleLogin dari context

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Simpan token dan nama pengguna di localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);

      // Panggil handleLogin dari context
      handleLogin(data.name);

      toast({
        title: 'Login berhasil.',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'Login gagal.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" direction="column">
      <Box bg="rgba(255, 255, 255, 0.8)" p={8} rounded="lg" shadow="lg" width={{ base: '90%', md: '400px' }}>
        <Heading mb={6} textAlign="center" color="pmiRed.500" fontSize="2xl">
          Login
        </Heading>
        <form onSubmit={handleLoginSubmit}>
          <VStack spacing={6}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="blueAccent.500"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="blueAccent.500"
              />
            </FormControl>
            <Button
              bg="greenAccent.500"
              color="white"
              _hover={{ bg: 'greenAccent.600' }}
              type="submit"
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center" color="blueAccent.500">
          Belum punya akun?{' '}
          <Link to="/register" style={{ color: 'blueAccent.500', fontWeight: 'bold' }}>
            Daftar di sini
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
