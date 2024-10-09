// Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  VStack,
  Button,
  Divider,
  useToast,
  Card,
  CardBody,
  Container,
} from '@chakra-ui/react';
import Navbar from './components/Navbar';  // Import Navbar
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  // Fetch data profil pengguna dari backend
  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        toast({
          title: 'Error.',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data profil:', error);
    }
  }, [toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle navigasi ke halaman edit profile
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  // Fungsi untuk memformat tanggal lahir menjadi format "01 Januari 2000"
  const formatTanggalLahir = (tanggalLahir) => {
    if (!tanggalLahir) return 'Data tidak tersedia';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(tanggalLahir).toLocaleDateString('id-ID', options);
  };

  // Mapping data dari backend ke format yang lebih deskriptif
  const pekerjaanMap = {
    0: 'Tidak Bekerja',
    1: 'PNS',
    2: 'TNI/POLRI',
    3: 'BUMN',
    4: 'Pegawai Swasta/Wirausaha',
    5: 'Lain-lain',
  };

  const golonganDarahMap = {
    0: 'Tidak Tahu',
    1: 'A',
    2: 'B',
    3: 'AB',
    4: 'O',
  };

  const jenisKelaminMap = {
    1: 'Laki-laki',
    2: 'Perempuan',
  };

  const agamaMap = {
    1: 'Islam',
    2: 'Kristen (Protestan)',
    3: 'Katolik',
    4: 'Hindu',
    5: 'Budha',
    6: 'Konghucu',
    7: 'Penghayat',
    8: 'Lain-lain',
  };

  return (
    <Box bg="neutral.50" minHeight="100vh">
      {/* Navbar dengan pesan scroll */}
      <Navbar scrollMessage="Ayo Donor Darah!" handleLogout={() => navigate('/login')} />

      {/* Kontainer utama untuk profil pengguna */}
      <Container maxW="container.md" py={10}>
        <Flex justify="center">
          <Card width={{ base: "100%", md: "500px" }} bg="white" p={6} shadow="lg" rounded="lg">
            <CardBody>
              {/* Heading Profil Pengguna */}
              <Heading as="h2" mb={6} textAlign="center" color="pmiRed.500">
                Profil Pengguna
              </Heading>

              {/* Data Profil Pengguna */}
              <VStack spacing={4} align="stretch">
                <Text><strong>Nama Lengkap:</strong> {userData.name || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Email:</strong> {userData.email || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>NIK:</strong> {userData.nik || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Jenis Kelamin:</strong> {jenisKelaminMap[userData.jenisKelamin] || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Agama:</strong> {agamaMap[userData.agama] || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Tempat dan Tanggal Lahir:</strong> {userData.tempatLahir ? `${userData.tempatLahir}, ${formatTanggalLahir(userData.tanggalLahir)}` : 'Data tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Alamat:</strong> {userData.alamat ? userData.alamat : 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Golongan Darah:</strong> {golonganDarahMap[userData.golonganDarah] || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Pekerjaan:</strong> {pekerjaanMap[userData.pekerjaan] || 'Tidak tersedia'}</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Berat Badan:</strong> {userData.beratBadan || 'Tidak tersedia'} kg</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Tinggi Badan:</strong> {userData.tinggiBadan || 'Tidak tersedia'} cm</Text>
                <Divider borderColor="neutral.300" />
                <Text><strong>Nomor Telepon:</strong> {userData.noHp || 'Tidak tersedia'}</Text>
              </VStack>

              {/* Tombol Edit Profil */}
              <Button colorScheme="pmiRed" mt={6} width="full" onClick={handleEditProfile}>
                Edit Profil
              </Button>
            </CardBody>
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}

export default Profile;
