// Login.js
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
      // Send POST request ke endpoint login di backend
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Kirim email dan password ke backend
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful', data);

      // Simpan token dan nama pengguna di localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);

      // Tampilkan notifikasi sukses
      toast({
        title: 'Login berhasil.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Redirect ke dashboard setelah login
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

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

  // Gunakan framer-motion untuk animasi
  const MotionBox = motion(Box);
  const MotionHeading = motion(Heading); // Motion untuk heading login

  return (
    <Flex align="center" justify="center" minH="100vh" direction="column">      
      {/* Card Login */}
      <MotionBox
        initial={isFirstLoad ? { opacity: 0, y: -30 } : {}}
        animate={isFirstLoad ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        bg="rgba(255, 255, 255, 0.8)"
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
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set nilai email
                focusBorderColor="blueAccent.500" // Warna border saat fokus
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set nilai password
                focusBorderColor="blueAccent.500" // Warna border saat fokus
              />
            </FormControl>
            <Button
              bg="greenAccent.500" // Warna hijau untuk tombol
              color="white"
              _hover={{ bg: "greenAccent.600" }} // Hover hijau lebih gelap
              type="submit"
              width="full"
              isLoading={false} // Bisa dikontrol dengan state loading
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center" color="blueAccent.500"> {/* Warna biru pada link */}
          Belum punya akun?{' '}
          <Link to="/register" style={{ color: 'blueAccent.500', fontWeight: 'bold' }}>
            Daftar di sini
          </Link>
        </Text>
      </MotionBox>
    </Flex>
  );
}

export default Login;
