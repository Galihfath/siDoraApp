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
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const fetchProfile = async () => {
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
  };
  // Fungsi untuk memformat tanggal lahir menjadi "01 Januari 2000"
const formatTanggalLahir = (tanggalLahir) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(tanggalLahir).toLocaleDateString('id-ID', options);
  };
  
  // Gabungkan tempat lahir dan tanggal lahir
  const tempatTanggalLahir = `${userData.tempatLahir}, ${formatTanggalLahir(userData.tanggalLahir)}`;
  
  const pekerjaanMap = {
    0: 'Tidak Bekerja',
    1: 'PNS',
    2: 'TNI/POLRI',
    3: 'BUMN',
    4: 'Pegawai Swasta/Wirausaha',
    5: 'Lain-lain',
  };
  
  // Gunakan mapping saat menampilkan data
  const pekerjaan = pekerjaanMap[userData.pekerjaan];
  const golonganDarahMap = {
    0: 'Tidak Tahu',
    1: 'A',
    2: 'B',
    3: 'AB',
    4: 'O',
  };
  
  const golonganDarah = golonganDarahMap[userData.golonganDarah];
  const jenisKelaminMap = {
    1: 'Laki-laki',
    2: 'Perempuan',
  };
  
  const jenisKelamin = jenisKelaminMap[userData.jenisKelamin];
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
  
  const agama = agamaMap[userData.agama];
  
const [provinsiList, setProvinsiList] = useState([]);
const [kabupatenList, setKabupatenList] = useState([]);
const [kecamatanList, setKecamatanList] = useState([]);
const [kelurahanList, setKelurahanList] = useState([]);
useEffect(() => {
    fetch('https://ibnux.github.io/data-indonesia/provinsi.json')
      .then((response) => response.json())
      .then((data) => setProvinsiList(data));

    // Ambil data kabupaten berdasarkan ID provinsi
    if (userData.provinsi) {
      fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${userData.provinsi}.json`)
        .then((response) => response.json())
        .then((data) => setKabupatenList(data));
    }

    // Ambil data kecamatan berdasarkan ID kabupaten
    if (userData.kota) {
      fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${userData.kota}.json`)
        .then((response) => response.json())
        .then((data) => setKecamatanList(data));
    }

    // Ambil data kelurahan berdasarkan ID kecamatan
    if (userData.kecamatan) {
      fetch(`https://ibnux.github.io/data-indonesia/kelurahan/${userData.kecamatan}.json`)
        .then((response) => response.json())
        .then((data) => setKelurahanList(data));
    }
  }, [userData.provinsi, userData.kota, userData.kecamatan]);

  // Fungsi untuk mendapatkan nama wilayah dari ID
  const getNamaWilayah = (list, id) => {
    const wilayah = list.find((item) => item.id === id);
    return wilayah ? wilayah.nama : 'Tidak ditemukan';
  };

  // Ambil nama wilayah yang sesuai dengan ID yang tersimpan
  const namaProvinsi = getNamaWilayah(provinsiList, userData.provinsi);
  const namaKabupaten = getNamaWilayah(kabupatenList, userData.kota);
  const namaKecamatan = getNamaWilayah(kecamatanList, userData.kecamatan);
  const namaKelurahan = getNamaWilayah(kelurahanList, userData.kelurahan);
  const alamatLengkap = `${userData.alamat}, RT ${userData.rt}/RW ${userData.rw}, Kelurahan ${namaKelurahan}, Kecamatan ${namaKecamatan}, ${namaKabupaten}, Provinsi ${namaProvinsi}, Kode Pos: ${userData.kodePos}`;

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };
  
  const handleEditProfile = () => {
    navigate('/edit-profile');
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

        {/* Logo PMI dan siDORA */}
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
            <MenuItem as={Link} to="/profile" _hover={{ color: 'gray.700' }} color="green.500">
              Profile
            </MenuItem>
            <MenuItem _hover={{ color: 'gray.700' }} color="red.500" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Profile Card */}
      <Flex justify="center" mt={6}>
        <Card width="500px" bg="white" p={6} shadow="md" rounded="md">
          <CardBody>
            <Heading as="h2" mb={4} textAlign="center" color="teal.500">
              Profil Pengguna
            </Heading>

            <VStack spacing={4} align="start">
              <Text><strong>Nama Lengkap:</strong> {userData.name}</Text>
              <Divider />
              <Text><strong>Email:</strong> {userData.email}</Text>
              <Divider />
              <Text><strong>NIK:</strong> {userData.nik}</Text>
              <Divider />
              <Text><strong>Jenis Kelamin:</strong> {jenisKelaminMap[userData.jenisKelamin]}</Text>
              <Divider />
              <Text><strong>Agama:</strong> {agamaMap[userData.agama]}</Text>
              <Divider />
              <Text><strong>Tempat dan Tanggal Lahir:</strong> {tempatTanggalLahir}</Text>
              <Divider />
              <Text><strong>Alamat:</strong> {alamatLengkap}</Text>
              <Divider />
              <Text><strong>Golongan Darah:</strong> {golonganDarahMap[userData.golonganDarah]}</Text>
              <Divider />
              <Text><strong>Pekerjaan:</strong> {pekerjaanMap[userData.pekerjaan]}</Text>
              <Divider />
              <Text><strong>Berat Badan:</strong> {userData.beratBadan} kg</Text>
              <Divider />
              <Text><strong>Tinggi Badan:</strong> {userData.tinggiBadan} cm</Text>
              <Divider />
              <Text><strong>Nomor Telepon:</strong> {userData.noHp}</Text>
            </VStack>

            {/* Tombol Edit Profile */}
            <Button colorScheme="teal" mt={6} width="full" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}

export default Profile;
