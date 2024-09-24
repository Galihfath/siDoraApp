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
} from '@chakra-ui/react';
import Navbar from './components/Navbar';  // Import Navbar
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

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
  
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  // Fungsi untuk memformat tanggal lahir menjadi "01 Januari 2000"
  const formatTanggalLahir = (tanggalLahir) => {
    if (!tanggalLahir) return 'Data tidak tersedia';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(tanggalLahir).toLocaleDateString('id-ID', options);
  };

  // Gabungkan tempat lahir dan tanggal lahir dengan fallback
  const tempatTanggalLahir = userData.tempatLahir && userData.tanggalLahir 
    ? `${userData.tempatLahir}, ${formatTanggalLahir(userData.tanggalLahir)}`
    : 'Data tidak tersedia';

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

  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);

  useEffect(() => {
    fetch('https://ibnux.github.io/data-indonesia/provinsi.json')
      .then((response) => response.json())
      .then((data) => setProvinsiList(data));

    if (userData.provinsi) {
      fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${userData.provinsi}.json`)
        .then((response) => response.json())
        .then((data) => setKabupatenList(data));
    }

    if (userData.kota) {
      fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${userData.kota}.json`)
        .then((response) => response.json())
        .then((data) => setKecamatanList(data));
    }

    if (userData.kecamatan) {
      fetch(`https://ibnux.github.io/data-indonesia/kelurahan/${userData.kecamatan}.json`)
        .then((response) => response.json())
        .then((data) => setKelurahanList(data));
    }
  }, [userData.provinsi, userData.kota, userData.kecamatan]);

  const getNamaWilayah = (list, id) => {
    const wilayah = list.find((item) => item.id === id);
    return wilayah ? wilayah.nama : 'Tidak ditemukan';
  };

  const namaProvinsi = getNamaWilayah(provinsiList, userData.provinsi);
  const namaKabupaten = getNamaWilayah(kabupatenList, userData.kota);
  const namaKecamatan = getNamaWilayah(kecamatanList, userData.kecamatan);
  const namaKelurahan = getNamaWilayah(kelurahanList, userData.kelurahan);

  const alamatLengkap = userData.alamat && namaProvinsi && namaKabupaten && namaKecamatan && namaKelurahan
    ? `${userData.alamat}, RT ${userData.rt || '-'}/RW ${userData.rw || '-'}, Kelurahan ${namaKelurahan}, Kecamatan ${namaKecamatan}, ${namaKabupaten}, Provinsi ${namaProvinsi}, Kode Pos: ${userData.kodePos || '-'}`
    : 'Alamat tidak lengkap';

  return (
    <Box>
      <Navbar scrollMessage="Ayo Donor Darah!" handleLogout={() => navigate('/login')} />
      {/* Profile Card */}
      <Flex justify="center" mt={6}>
        <Card width="500px" bg="white" p={6} shadow="md" rounded="md">
          <CardBody>
            <Heading as="h2" mb={4} textAlign="center" color="teal.500">
              Profil Pengguna
            </Heading>

            <VStack spacing={4} align="start">
              <Text><strong>Nama Lengkap:</strong> {userData.name || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>Email:</strong> {userData.email || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>NIK:</strong> {userData.nik || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>Jenis Kelamin:</strong> {jenisKelaminMap[userData.jenisKelamin] || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>Agama:</strong> {agamaMap[userData.agama] || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>Tempat dan Tanggal Lahir:</strong> {tempatTanggalLahir}</Text>
              <Divider />
              <Text><strong>Alamat:</strong> {alamatLengkap}</Text>
              <Divider />
              <Text><strong>Golongan Darah:</strong> {golonganDarahMap[userData.golonganDarah] || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>Pekerjaan:</strong> {pekerjaanMap[userData.pekerjaan] || 'Tidak tersedia'}</Text>
              <Divider />
              <Text><strong>Berat Badan:</strong> {userData.beratBadan || 'Tidak tersedia'} kg</Text>
              <Divider />
              <Text><strong>Tinggi Badan:</strong> {userData.tinggiBadan || 'Tidak tersedia'} cm</Text>
              <Divider />
              <Text><strong>Nomor Telepon:</strong> {userData.noHp || 'Tidak tersedia'}</Text>
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
