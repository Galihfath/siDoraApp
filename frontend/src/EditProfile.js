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
  const { isOpen, onOpen, onClose } = useDisclosure(); // For hamburger menu
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
    beratBadan: '',
    tinggiBadan: '',
    noHp: '',
  });
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const navigate = useNavigate();

  // Get username from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Fetch province data on component mount
  useEffect(() => {
    fetch('https://ibnux.github.io/data-indonesia/provinsi.json')
      .then((response) => response.json())
      .then((data) => setProvinsi(data));
  }, []);

  const handleProvinsiChange = (e) => {
    const provId = e.target.value;
    setFormData({ ...formData, provinsi: provId });

    // Fetch Kabupaten/Kota data
    fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${provId}.json`)
      .then((response) => response.json())
      .then((data) => setKabupaten(data));
  };
  const handleKabupatenChange = (e) => {
    const kabId = e.target.value;
    setFormData({ ...formData, kota: kabId });

    // Fetch Kecamatan data
    fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${kabId}.json`)
      .then((response) => response.json())
      .then((data) => setKecamatan(data));
  };

  const handleKecamatanChange = (e) => {
    const kecId = e.target.value;
    setFormData({ ...formData, kecamatan: kecId });

    // Fetch Kelurahan data
    fetch(`https://ibnux.github.io/data-indonesia/kelurahan/${kecId}.json`)
      .then((response) => response.json())
      .then((data) => setKelurahan(data));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Ambil 'name' dan 'value' dari elemen input yang berubah
    setFormData((prevData) => ({
        ...prevData, // Menyalin nilai sebelumnya dalam formData
        [name]: value, // Menetapkan nilai baru untuk field yang sesuai dengan name
    }));
  };
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        setFormData(data); // Menampilkan data ke form setelah berhasil diambil
        setUserName(data.name);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data profil:', error);
    }
  };
  
  // Panggil fetchProfile saat komponen di-mount
  useEffect(() => {
    fetchProfile();
  }, []);
  
  // Fungsi untuk menyimpan perubahan profil
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage
      const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Profil berhasil diperbarui');
        navigate('/profile'); // Redirect ke halaman profile setelah berhasil
      } else {
        const data = await response.json();
        console.error(data.message);
        alert('Gagal memperbarui profil');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memperbarui profil:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
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
                <Button as={Link} to="/daftar-donor" variant="link">
                  Daftar Donor Darah
                </Button>
                <Button as={Link} to="/jadwal-donor" variant="link">
                  Jadwal Donor Darah
                </Button>
                <Button as={Link} to="/riwayat-donor" variant="link">
                  Riwayat Donor
                </Button>
                <Button as={Link} to="/kartu-donor" variant="link">
                  Kartu Donor Darah
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* Logo PMI and siDORA with separator */}
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
            <MenuItem _hover={{ color: 'gray.700' }} color="red.500" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* Edit Profile Content */}
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

          {/* Berat Badan */}
          <FormControl id="beratBadan" isRequired>
            <FormLabel>Berat Badan</FormLabel>
            <Input
              name="beratBadan"
              type="number"
              placeholder="Berat Badan (Kg)"
              value={formData.beratBadan}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* Tinggi Badan */}
          <FormControl id="tinggiBadan" isRequired>
            <FormLabel>Tinggi Badan</FormLabel>
            <Input
              name="tinggiBadan"
              type="number"
              placeholder="Tinggi Badan (cm)"
              value={formData.tinggiBadan}
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

          {/* Provinsi */}
          <FormControl id="provinsi" isRequired>
            <FormLabel>Provinsi</FormLabel>
            <Select name="provinsi" onChange={handleProvinsiChange}>
              {provinsi.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.nama}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Kabupaten */}
          <FormControl id="kabupaten" isRequired>
            <FormLabel>Kabupaten/Kota</FormLabel>
            <Select name="kota" onChange={handleKabupatenChange}>
              {kabupaten.map((kab) => (
                <option key={kab.id} value={kab.id}>
                  {kab.nama}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* Kecamatan */}
          <FormControl id="kecamatan" isRequired>
            <FormLabel>Kecamatan</FormLabel>
            <Select name="kecamatan" onChange={handleKecamatanChange}>
              {kecamatan.map((kec) => (
                <option key={kec.id} value={kec.id}>
                  {kec.nama}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Kelurahan */}
          <FormControl id="kelurahan" isRequired>
            <FormLabel>Kelurahan/Desa</FormLabel>
            <Select name="kelurahan" onChange={handleInputChange}>
              {kelurahan.map((kel) => (
                <option key={kel.id} value={kel.id}>
                  {kel.nama}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Kode Pos */}
          <FormControl id="kodePos" isRequired>
            <FormLabel>Kode Pos</FormLabel>
            <Input
              name="kodePos"
              type="number"
              placeholder="Masukkan Kode Pos"
              value={formData.kodePos}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* Golongan Darah */}
          <FormControl id="golonganDarah" isRequired>
            <FormLabel>Golongan Darah</FormLabel>
            <Select
              name="golonganDarah"
              value={formData.golonganDarah}
              onChange={handleInputChange}
            >
              <option value="0">Tidak Tahu</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">AB</option>
              <option value="4">O</option>
            </Select>
          </FormControl>

          {/* Pekerjaan */}
          <FormControl id="pekerjaan" isRequired>
            <FormLabel>Pekerjaan</FormLabel>
            <Select
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleInputChange}
            >
              <option value="0">Tidak Bekerja</option>
              <option value="1">PNS</option>
              <option value="2">TNI/POLRI</option>
              <option value="3">BUMN</option>
              <option value="4">Pegawai Swasta/Wirausaha</option>
              <option value="5">Lain-lain</option>
            </Select>
          </FormControl>
          {/* No HP */}
          <FormControl id="noHp" isRequired>
            <FormLabel>Nomor Telepon</FormLabel>
            <Input
              name="noHp"
              type="number"
              placeholder="Masukkan Nomor Telepon"
              value={formData.noHp}
              onChange={handleInputChange}
            />
          </FormControl>
        </VStack>

        {/* Tombol Simpan Perubahan */}
        <Button colorScheme="teal" width="full" mt={6} onClick={handleSaveChanges}>
          Simpan Perubahan
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfile;
