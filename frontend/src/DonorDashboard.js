import React, { useState, useEffect } from 'react'; 
import {
  Box,
  Heading,
  Flex,
  Text,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Spacer,
  Button,
  Divider,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { HamburgerIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

function DonorDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Untuk hamburger menu
  const [scrollMessage] = useState('Ayo Donor Darah! Jadwal Donor Darah Terdekat: 25 Sept 2024 di PMI Jakarta');
  const [userName, setUserName] = useState(''); // Inisialisasi state untuk nama pengguna
  const navigate = useNavigate(); // Untuk navigasi logout

  // Ambil nama pengguna dari localStorage saat komponen di-mount
  useEffect(() => {
    const storedName = localStorage.getItem('name'); // Ambil nama pengguna dari localStorage
    if (storedName) {
      setUserName(storedName); // Set nama pengguna di state
    }
  }, []);

  const handleLogout = () => {
    // Hapus token dan nama pengguna dari localStorage saat logout
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    console.log('User logged out');
    navigate('/login'); // Navigasi kembali ke halaman login setelah logout
  };

  return (
    <Box>
      {/* Header */}
      <Flex bg="teal.500" p={4} color="white" alignItems="center">
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          onClick={onOpen}
          variant="ghost"
          colorScheme="whiteAlpha"
          mr={4}
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <VStack align="start" spacing={4} mt={10}>
                <Button as={Link} to="/daftar-donor" variant="link">Daftar Donor Darah</Button>
                <Button as={Link} to="/jadwal-donor" variant="link">Jadwal Donor Darah</Button>
                <Button as={Link} to="/riwayat-donor" variant="link">Riwayat Donor</Button>
                <Button as={Link} to="/kartu-donor" variant="link">Kartu Donor Darah</Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Logo PMI dan siDORA dengan separator garis putih */}
        <HStack spacing={4}>
          <HStack spacing={2}>
            <Avatar src="/path-to-pmi-logo.png" size="sm" />
            <VStack spacing={0} align="start">
              <Text fontSize="sm" fontWeight="bold">Palang Merah</Text>
              <Text fontSize="sm" fontWeight="bold">Indonesia</Text>
            </VStack>
          </HStack>
          <Divider orientation="vertical" borderColor="white" height="40px" />
          <HStack spacing={2}>
            <Avatar src="/path-to-sidora-logo.png" size="sm" />
            <Heading as="h1" size="lg">siDORA</Heading>
          </HStack>
        </HStack>

        {/* Teks Bergerak */}
        <Spacer />
        <Box ml={4} overflow="hidden" whiteSpace="nowrap" flexGrow={1}>
          <Text as="marquee" fontSize="sm" color="yellow.300">
            {scrollMessage}
          </Text>
        </Box>

        {/* User Avatar dan Menu */}
        <Menu>
          <MenuButton>
            <Avatar src="/path-to-user-avatar.png" size="sm" />
          </MenuButton>
          <MenuList>
            {/* Warna hijau untuk Edit Data User dan merah untuk Logout */}
            <MenuItem as={Link} to="/edit-profile" _hover={{ color: 'gray.700' }} color="green.500">
              Edit Profile
            </MenuItem>
            <MenuItem _hover={{ color: 'gray.700' }} color="red.500" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Isi Konten Dashboard */}
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" mb={4} textAlign="center" color="teal.500">
        Hallo, {userName}! Selamat Datang di dashboard pendonor darah siDORA.
        </Heading>
        <Text fontSize="lg" mb={4} textAlign="center">
          Berikut adalah informasi mengenai persyaratan untuk menjadi donor darah:
        </Text>

        <VStack spacing={4} align="start">
          <Heading as="h3" size="md" color="teal.400" mt={4}>
            Syarat Umum Donor Darah:
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Berusia 17 hingga 65 tahun.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Berat badan minimal 45 kg.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Tekanan darah normal (sistolik: 110-160 mmHg, diastolik: 70-100 mmHg).
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Hemoglobin minimal 12,5 g/dL untuk wanita dan 13,0 g/dL untuk pria.
            </ListItem>
          </List>
        </VStack>
      </Box>
    </Box>
  );
}

export default DonorDashboard;
