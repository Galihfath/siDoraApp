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
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

function EditProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Untuk hamburger menu
  const [userName, setUserName] = useState('');
  const [formData, setFormData] = useState({
    nik: '',
    jenisKelamin: '',
    agama: '',
    tempatLahir: '',
    tanggalLahir: '',
    alamat: '',
    rt: '',
    rw: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    kodePos: '',
    golonganDarah: '',
    pekerjaan: '',
  });
  
  const navigate = useNavigate();

  // Ambil nama pengguna dari localStorage saat komponen di-mount
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
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

        {/* Logo PMI dan siDORA dengan separator */}
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

        <Spacer />
        <Menu>
          <MenuButton>
            <Avatar src="/path-to-user-avatar.png" size="sm" />
          </MenuButton>
          <MenuList>
          <MenuItem as={Link} to="/edit-profile" _hover={{ color: 'gray.700' }} color="green.500">
              Edit Profile
            </MenuItem>
            <MenuItem _hover={{ color: 'gray.700' }} color="red.500" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Isi Konten Edit Profile */}
      <Box bg="white" p={6} rounded="md" shadow="md" mt={6}>
        <Heading as="h2" mb={4} textAlign="center" color="teal.500">
          Edit Profile - {userName}
        </Heading>

        <VStack spacing={4} align="start">
          {/* Name */}
          <FormControl id="name" isReadOnly>
            <FormLabel>Nama Lengkap</FormLabel>
            <Input value={userName} readOnly />
          </FormControl>

          {/* NIK */}
          <FormControl id="nik" isRequired>
            <FormLabel>NIK</FormLabel>
            <Input
              name="nik"
              type="number"
              placeholder="Masukkan NIK (16 digit)"
              value={formData.nik}
              onChange={handleInputChange}
              maxLength={16}
            />
          </FormControl>

          {/* Jenis Kelamin */}
          <FormControl id="jenisKelamin" isRequired>
            <FormLabel>Jenis Kelamin</FormLabel>
            <Select
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onChange={handleInputChange}
            >
              <option value="0">Tidak diketahui</option>
              <option value="1">Laki-laki</option>
              <option value="2">Perempuan</option>
              <option value="3">Tidak dapat ditentukan</option>
              <option value="4">Tidak mengisi</option>
            </Select>
          </FormControl>

          {/* Agama */}
          <FormControl id="agama" isRequired>
            <FormLabel>Agama</FormLabel>
            <Select
              name="agama"
              value={formData.agama}
              onChange={handleInputChange}
            >
              <option value="1">Islam</option>
              <option value="2">Kristen (Protestan)</option>
              <option value="3">Katolik</option>
              <option value="4">Hindu</option>
              <option value="5">Budha</option>
              <option value="6">Konghucu</option>
              <option value="7">Penghayat</option>
              <option value="8">Lain-lain</option>
            </Select>
          </FormControl>

          {/* Tempat Lahir */}
          <FormControl id="tempatLahir" isRequired>
            <FormLabel>Tempat Lahir</FormLabel>
            <Input
              name="tempatLahir"
              type="text"
              placeholder="Masukkan tempat lahir"
              value={formData.tempatLahir}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Tanggal Lahir */}
          <FormControl id="tanggalLahir" isRequired>
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input
              name="tanggalLahir"
              type="date"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Alamat */}
          <FormControl id="alamat" isRequired>
            <FormLabel>Alamat Lengkap</FormLabel>
            <Input
              name="alamat"
              type="text"
              placeholder="Masukkan alamat lengkap"
              value={formData.alamat}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* RT, RW, Provinsi, Kota/Kab, dll. */}
          {/* Anda dapat menambahkan kolom-kolom ini dengan format yang sama */}
          {/* RT */}
          <FormControl id="rt" isRequired>
            <FormLabel>RT</FormLabel>
            <Input
              name="rt"
              type="number"
              placeholder="Masukkan RT"
              value={formData.rt}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* RW */}
          <FormControl id="rw" isRequired>
            <FormLabel>RW</FormLabel>
            <Input
              name="rw"
              type="number"
              placeholder="Masukkan RW"
              value={formData.rw}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Lanjutkan sesuai kebutuhan Anda dengan Provinsi, Kota/Kab, Kecamatan, Kelurahan, dll */}
        </VStack>

        <Button colorScheme="teal" width="full" mt={6}>
          Simpan Perubahan
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfile;
