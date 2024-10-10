// src/Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Heading, VStack, Text, Button, Container, Divider } from '@chakra-ui/react';
import Navbar from './components/Navbar'; // Import Navbar
import { useNavigate } from 'react-router-dom';
import fetchData from './utils/fetchData'; // Import fetchData untuk pemanggilan API
import { fetchProvinsi, fetchKabupaten, fetchKecamatan, fetchKelurahan } from './utils/locationServices'; // Import fungsi fetch wilayah

function Profile() {
  const [userData, setUserData] = useState({}); // State untuk menyimpan data profil pengguna
  const [namaProvinsi, setNamaProvinsi] = useState(''); // State untuk menyimpan nama provinsi
  const [namaKabupaten, setNamaKabupaten] = useState(''); // State untuk menyimpan nama kabupaten/kota
  const [namaKecamatan, setNamaKecamatan] = useState(''); // State untuk menyimpan nama kecamatan
  const [namaKelurahan, setNamaKelurahan] = useState(''); // State untuk menyimpan nama kelurahan
  const navigate = useNavigate(); // Untuk navigasi ke halaman lain

  // Fungsi untuk mengambil data profil dari backend dan nama wilayah berdasarkan ID
  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token dari local storage
      if (!token) {
        throw new Error('Token tidak ditemukan, silakan login ulang.');
      }

      // Ambil data profil pengguna
      const userProfile = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/profile', 'GET', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(userProfile); // Set data profil pengguna ke state userData

      // Ambil nama wilayah berdasarkan ID
      if (userProfile.provinsi) {
        const provinsiData = await fetchProvinsi();
        const provinsi = provinsiData.find((prov) => prov.id === userProfile.provinsi);
        setNamaProvinsi(provinsi ? provinsi.nama : 'Provinsi tidak ditemukan');
      }

      if (userProfile.kota) {
        const kabupatenData = await fetchKabupaten(userProfile.provinsi);
        const kabupaten = kabupatenData.find((kab) => kab.id === userProfile.kota);
        setNamaKabupaten(kabupaten ? kabupaten.nama : 'Kabupaten/Kota tidak ditemukan');
      }

      if (userProfile.kecamatan) {
        const kecamatanData = await fetchKecamatan(userProfile.kota);
        const kecamatan = kecamatanData.find((kec) => kec.id === userProfile.kecamatan);
        setNamaKecamatan(kecamatan ? kecamatan.nama : 'Kecamatan tidak ditemukan');
      }

      if (userProfile.kelurahan) {
        const kelurahanData = await fetchKelurahan(userProfile.kecamatan);
        const kelurahan = kelurahanData.find((kel) => kel.id === userProfile.kelurahan);
        setNamaKelurahan(kelurahan ? kelurahan.nama : 'Kelurahan tidak ditemukan');
      }
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  }, []);

  // Mengambil data profil saat komponen pertama kali dimuat
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Fungsi untuk memformat tanggal lahir menjadi "01 Januari 2000"
  const formatTanggalLahir = (tanggalLahir) => {
    if (!tanggalLahir) return 'Data tidak tersedia';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(tanggalLahir).toLocaleDateString('id-ID', options);
  };

  // Gabungkan tempat lahir dan tanggal lahir
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

  // Fungsi untuk menggabungkan alamat lengkap
  const formatAlamatLengkap = () => {
    const { alamat, rt, rw, kodePos } = userData;

    if (!alamat && !rt && !rw && !namaKelurahan && !namaKecamatan && !namaKabupaten && !namaProvinsi && !kodePos) {
      return 'Alamat tidak tersedia';
    }

    return `${alamat ? `${alamat}, ` : ''}RT ${rt || '-'}, RW ${rw || '-'}, 
            Kelurahan ${namaKelurahan || '-'}, Kecamatan ${namaKecamatan || '-'}, 
            Kota/Kabupaten ${namaKabupaten || '-'}, Provinsi ${namaProvinsi || '-'}, 
            Kode Pos: ${kodePos || '-'}`;
  };

  return (
    <Box minHeight="100vh">
      <Navbar scrollMessage="Selamat datang di siDORA!" handleLogout={() => navigate('/login')} /> {/* Navbar */}
      
      {/* Kontainer utama untuk menampilkan profil */}
      <Container maxW="container.lg" mt={10} p={6} bg="white" borderRadius="md" shadow="lg">
        <Heading as="h2" mb={8} textAlign="center" color="pmiRed.500">
          Profil Pengguna
        </Heading>
        <VStack spacing={4} align="stretch">
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
          <Text><strong>Alamat:</strong> {formatAlamatLengkap()}</Text>
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

        {/* Tombol untuk edit profil */}
        <Button colorScheme="teal" width="full" mt={6} onClick={() => navigate('/edit-profile')}>
          Edit Profil
        </Button>
      </Container>
    </Box>
  );
}

export default Profile;
