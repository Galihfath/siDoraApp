// src/EditProfile.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, FormControl, FormLabel, Input, Container } from '@chakra-ui/react';
import FormField from './components/FormField'; // Import komponen FormField
import Navbar from './components/Navbar'; // Import Navbar
import { useNavigate } from 'react-router-dom';
import fetchData from './utils/fetchData'; // Import fetchData untuk pemanggilan API
import { fetchProvinsi, fetchKabupaten, fetchKecamatan, fetchKelurahan } from './utils/locationServices'; // Import fungsi fetch dari locationServices

function EditProfile() {
  // State untuk menyimpan data formulir pengguna
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

  // State untuk menyimpan daftar lokasi wilayah
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Mengambil nama user dari local storage dan data profil dari backend
  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'User';
    setUserName(storedName);

    // Fungsi untuk fetch data profil pengguna
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Ambil token dari local storage
        const userProfile = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/profile', 'GET', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(userProfile); // Set data profil pengguna ke state formData
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };

    // Ambil data provinsi saat komponen dimuat
    const getProvinsi = async () => {
      try {
        const provinsiData = await fetchProvinsi();
        setProvinsi(provinsiData);
      } catch (error) {
        console.error('Error fetching provinsi data:', error);
      }
    };

    fetchUserProfile(); // Panggil fungsi untuk mengambil data profil
    getProvinsi(); // Panggil fungsi untuk mengambil data provinsi
  }, []);

  // Mengambil data kabupaten berdasarkan provinsi yang dipilih
  const handleProvinsiChange = async (e) => {
    const provId = e.target.value;
    setFormData({ ...formData, provinsi: provId });

    // Fetch data Kabupaten/Kota
    try {
      const kabupatenData = await fetchKabupaten(provId);
      setKabupaten(kabupatenData);
    } catch (error) {
      console.error('Error fetching kabupaten data:', error);
    }
  };

  // Mengambil data kecamatan berdasarkan kabupaten yang dipilih
  const handleKabupatenChange = async (e) => {
    const kabId = e.target.value;
    setFormData({ ...formData, kota: kabId });

    // Fetch data Kecamatan
    try {
      const kecamatanData = await fetchKecamatan(kabId);
      setKecamatan(kecamatanData);
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  };

  // Mengambil data kelurahan berdasarkan kecamatan yang dipilih
  const handleKecamatanChange = async (e) => {
    const kecId = e.target.value;
    setFormData({ ...formData, kecamatan: kecId });

    // Fetch data Kelurahan
    try {
      const kelurahanData = await fetchKelurahan(kecId);
      setKelurahan(kelurahanData);
    } catch (error) {
      console.error('Error fetching kelurahan data:', error);
    }
  };

  // Mengubah nilai di form berdasarkan input pengguna
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fungsi untuk menyimpan perubahan profil
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/update', 'PUT', {
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      alert('Profil berhasil diperbarui');
      navigate('/profile'); // Redirect ke halaman profile setelah berhasil menyimpan data
    } catch (error) {
      console.error('Terjadi kesalahan saat memperbarui profil:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <Box minHeight="100vh">
      <Navbar scrollMessage="Ayo Donor Darah!" handleLogout={() => navigate('/login')} /> {/* Menampilkan Navbar */}
      
      {/* Kontainer utama untuk formulir */}
      <Container maxW="container.lg" mt={10} p={6} bg="white" borderRadius="md" shadow="lg">
        <Heading as="h2" mb={8} textAlign="center" color="pmiRed.500">
          Edit Profil
        </Heading>
        
        {/* Form Edit Profile */}
        <VStack spacing={4} align="stretch">
          {/* Nama Lengkap (Readonly) */}
          <FormControl id="name" isReadOnly>
            <FormLabel>Nama Lengkap</FormLabel>
            <Input value={userName} readOnly />
          </FormControl>
          
          {/* Form Field Lainnya */}
          <FormField label="NIK" name="nik" type="number" value={formData.nik} onChange={handleInputChange} />
          <FormField label="Jenis Kelamin" name="jenisKelamin" isSelect options={[
            { label: 'Tidak Diketahui', value: '0' },
            { label: 'Laki-laki', value: '1' },
            { label: 'Perempuan', value: '2' },
            { label: 'Tidak Dapat Ditentukan', value: '3' },
            { label: 'Tidak Mengisi', value: '4' }
          ]} value={formData.jenisKelamin} onChange={handleInputChange} />
          <FormField label="Agama" name="agama" isSelect options={[
            { label: 'Islam', value: '1' },
            { label: 'Kristen (Protestan)', value: '2' },
            { label: 'Katolik', value: '3' },
            { label: 'Hindu', value: '4' },
            { label: 'Budha', value: '5' },
            { label: 'Konghucu', value: '6' },
            { label: 'Penghayat', value: '7' },
            { label: 'Lain-lain', value: '8' }
          ]} value={formData.agama} onChange={handleInputChange} />
          <FormField label="Tempat Lahir" name="tempatLahir" value={formData.tempatLahir} onChange={handleInputChange} />
          <FormField label="Tanggal Lahir" name="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={handleInputChange} />
          <FormField label="Berat Badan" name="beratBadan" type="number" value={formData.beratBadan} onChange={handleInputChange} />
          <FormField label="Tinggi Badan" name="tinggiBadan" type="number" value={formData.tinggiBadan} onChange={handleInputChange} />
          <FormField label="Alamat Lengkap" name="alamat" value={formData.alamat} onChange={handleInputChange} />
          <FormField label="RT" name="rt" type="number" value={formData.rt} onChange={handleInputChange} />
          <FormField label="RW" name="rw" type="number" value={formData.rw} onChange={handleInputChange} />
          
          {/* Form untuk pemilihan Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa */}
          <FormField label="Provinsi" name="provinsi" isSelect options={provinsi.map((prov) => ({
            label: prov.nama, value: prov.id
          }))} value={formData.provinsi} onChange={handleProvinsiChange} />
          <FormField label="Kabupaten/Kota" name="kota" isSelect options={kabupaten.map((kab) => ({
            label: kab.nama, value: kab.id
          }))} value={formData.kota} onChange={handleKabupatenChange} />
          <FormField label="Kecamatan" name="kecamatan" isSelect options={kecamatan.map((kec) => ({
            label: kec.nama, value: kec.id
          }))} value={formData.kecamatan} onChange={handleKecamatanChange} />
          <FormField label="Kelurahan/Desa" name="kelurahan" isSelect options={kelurahan.map((kel) => ({
            label: kel.nama, value: kel.id
          }))} value={formData.kelurahan} onChange={handleInputChange} />

          {/* Field Lainnya */}
          <FormField label="Kode Pos" name="kodePos" type="number" value={formData.kodePos} onChange={handleInputChange} />
          <FormField label="Golongan Darah" name="golonganDarah" isSelect options={[
            { label: 'Tidak Tahu', value: '0' },
            { label: 'A', value: '1' },
            { label: 'B', value: '2' },
            { label: 'AB', value: '3' },
            { label: 'O', value: '4' }
          ]} value={formData.golonganDarah} onChange={handleInputChange} />
          <FormField label="Pekerjaan" name="pekerjaan" isSelect options={[
            { label: 'Tidak Bekerja', value: '0' },
            { label: 'PNS', value: '1' },
            { label: 'TNI/POLRI', value: '2' },
            { label: 'BUMN', value: '3' },
            { label: 'Pegawai Swasta/Wirausaha', value: '4' },
            { label: 'Lain-lain', value: '5' }
          ]} value={formData.pekerjaan} onChange={handleInputChange} />
          <FormField label="Nomor Telepon" name="noHp" type="number" value={formData.noHp} onChange={handleInputChange} />

          {/* Tombol Simpan */}
          <Button colorScheme="teal" width="full" mt={6} onClick={handleSaveChanges}>
            Simpan Perubahan
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

export default EditProfile;
