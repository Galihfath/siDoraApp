import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion'; // Import Framer Motion

function Login() {
  const [email, setEmail] = useState(''); // State untuk email
  const [password, setPassword] = useState(''); // State untuk password
  const toast = useToast(); // Untuk menampilkan notifikasi
  const navigate = useNavigate(); // Untuk redirect ke halaman lain
  const [isFirstLoad, setIsFirstLoad] = useState(true); // State untuk cek apakah pertama kali render

  useEffect(() => {
    setIsFirstLoad(false); // Set false setelah komponen pertama kali di-render
  }, []);

  // Fungsi untuk menangani form submit (login)
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Send POST request to correct login endpoint in the backend
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Send email and password to backend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful', data);

      // Store token and username in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);

      // Show success toast
      toast({
        title: 'Login successful.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Redirect to dashboard after login
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
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

  const MotionBox = motion(Box);
  const MotionHeading = motion(Heading); // Motion untuk heading login

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.100" direction="column">      
      {/* Card Login */}
      <MotionBox
        initial={isFirstLoad ? { opacity: 0, y: -30 } : {}}
        animate={isFirstLoad ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        bg="white"
        p={8}
        rounded="md"
        shadow="lg"
        width={{ base: "90%", sm: "400px" }}
      >
        {/* Heading dengan animasi zoom dan fade */}
        <MotionHeading
          as="h1"
          mb={6}
          initial={isFirstLoad ? { opacity: 0, scale: 0.5 } : {}}
          animate={isFirstLoad ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          textAlign="center"
          fontSize="4xl"
          color="pmiRed.500"  // Warna merah PMI
        >
          Login
        </MotionHeading>
        <form onSubmit={handleLogin}>
          <VStack spacing={6}>
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
            <Button
              bg="#2ECC71" // Warna hijau untuk tombol
              color="white"
              _hover={{ bg: "#27AE60" }} // Hover hijau lebih gelap
              type="submit"
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center" color="blueAccent.500"> {/* Warna biru pada link */}
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'blueAccent.500', fontWeight: 'bold' }}>
            Register here
          </Link>
        </Text>
      </MotionBox>
    </Flex>
  );
}

export default Login;
