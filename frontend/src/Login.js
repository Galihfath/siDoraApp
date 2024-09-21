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

function Login() {
  const [email, setEmail] = useState(''); // State untuk email
  const [password, setPassword] = useState(''); // State untuk password
  const toast = useToast(); // Untuk menampilkan notifikasi
  const navigate = useNavigate(); // Untuk redirect ke halaman lain

  // Fungsi untuk menangani form submit (login)
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      // Kirim permintaan POST ke endpoint login di backend
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Kirim email dan password ke backend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parsing respons dari server
      const data = await response.json();
      console.log('Login successful', data);

      // Simpan token dan nama pengguna di localStorage
      localStorage.setItem('token', data.token); // Simpan token untuk autentikasi berikutnya
      localStorage.setItem('name', data.name);   // Simpan nama pengguna dari respons

      // Tampilkan notifikasi sukses
      toast({
        title: 'Login successful.',
        status: 'success',
        duration: 2000,  // Durasi pesan sukses
        isClosable: true,
      });

      // Redirect ke halaman dashboard atau halaman lainnya setelah login sukses
      setTimeout(() => {
        navigate('/dashboard'); // Ganti dengan halaman tujuan setelah login
      }, 2000);

    } catch (error) {
      // Tampilkan notifikasi error jika login gagal
      console.error('Error during login:', error);
      toast({
        title: 'Error logging in.',
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
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set nilai email
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set nilai password
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full">
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'teal', fontWeight: 'bold' }}>
            Register here
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
