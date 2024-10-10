// Register.js
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

function Register() {
  const [name, setName] = useState(''); // State untuk nama lengkap
  const [email, setEmail] = useState(''); // State untuk email
  const [password, setPassword] = useState(''); // State untuk password
  const toast = useToast(); // Untuk menampilkan notifikasi
  const navigate = useNavigate(); // Untuk redirect ke halaman lain

  // Fungsi untuk menangani form submit (register)
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Data being sent:", { name, email, password }); // Log data yang dikirim

    try {
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // Hanya kirim name, email, dan password
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Registration successful', data);

      toast({
        title: 'Pendaftaran berhasil.',
        description: 'Akun Anda telah berhasil dibuat.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        title: 'Gagal mendaftar.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh"> {/* Latar belakang terang */}
      <Box bg="rgba(255, 255, 255, 0.8)" p={8} rounded="lg" shadow="lg" width={{ base: "90%", md: "400px" }}> {/* Styling card */}
        <Heading mb={6} textAlign="center" color="pmiRed.500" fontSize="2xl"> {/* Warna heading merah PMI */}
          Register
        </Heading>
        <form onSubmit={handleRegister}>
          <VStack spacing={6}>
            <FormControl id="name" isRequired>
              <FormLabel>Nama Lengkap</FormLabel> {/* Label dalam Bahasa Indonesia */}
              <Input
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)} // Set nilai nama lengkap
                focusBorderColor="blueAccent.500" // Warna border fokus
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel> {/* Label Email */}
              <Input
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Set nilai email
                focusBorderColor="blueAccent.500" // Warna border fokus
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Set nilai password
                focusBorderColor="blueAccent.500" // Warna border fokus
              />
            </FormControl>
            <Button
              bg="greenAccent.500" // Warna hijau untuk tombol
              color="white"
              _hover={{ bg: "greenAccent.600" }} // Hover hijau lebih gelap
              type="submit"
              width="full"
            >
              Daftar
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center" color="neutral.700"> {/* Warna teks netral */}
          Sudah punya akun?{' '}
          <Link to="/login" style={{ color: '#3498DB', fontWeight: 'bold' }}> {/* Link biru untuk navigasi */}
            Login di sini
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Register;
