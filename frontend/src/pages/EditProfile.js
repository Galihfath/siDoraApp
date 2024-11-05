// src/EditProfile.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, FormControl, FormLabel, Input, Container } from '@chakra-ui/react';
import FormField from '../components/FormField';
import LocationSelector from '../components/LocationSelector';
import { useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import { fetchProvinsi, fetchKabupaten, fetchKecamatan, fetchKelurahan } from '../utils/locationServices';

function EditProfile() {
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
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Mengambil nama pengguna dari local storage dan set ke state `userName`
    const storedName = localStorage.getItem('name') || 'User';
    setUserName(storedName);
  
    // Mengambil data profil pengguna dari API
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userProfile = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/profile', 'GET', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(userProfile); // Set data profil ke state `formData`
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };
  
    // Mengambil data provinsi saat komponen dimuat
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
  
  const handleProvinsiChange = async (e) => {
    const provId = e.target.value;
    setFormData({ ...formData, provinsi: provId });
    try {
      const kabupatenData = await fetchKabupaten(provId);
      setKabupaten(kabupatenData);
    } catch (error) {
      console.error('Error fetching kabupaten data:', error);
    }
  };
  
  const handleKabupatenChange = async (e) => {
    const kabId = e.target.value;
    setFormData({ ...formData, kota: kabId });
    try {
      const kecamatanData = await fetchKecamatan(kabId);
      setKecamatan(kecamatanData);
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  };
  
  const handleKecamatanChange = async (e) => {
    const kecId = e.target.value;
    setFormData({ ...formData, kecamatan: kecId });
    try {
      const kelurahanData = await fetchKelurahan(kecId);
      setKelurahan(kelurahanData);
    } catch (error) {
      console.error('Error fetching kelurahan data:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Fungsi untuk menyimpan perubahan profil pengguna
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


// Render UI untuk form edit profile
return (
  <Box minHeight="100vh">
    <Container maxW="container.lg" mt={10} p={6} bg="white" borderRadius="md" shadow="lg">
      <Heading as="h2" mb={8} textAlign="center" color="pmiRed.500">
        Edit Profil
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl id="name" isReadOnly>
          <FormLabel>Nama Lengkap</FormLabel>
          <Input value={userName} readOnly />
        </FormControl>

        {/* Semua field untuk edit profile */}
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

        {/* Menggunakan komponen LocationSelector untuk data lokasi */}
        <LocationSelector
          formData={formData}
          handleInputChange={handleInputChange}
          handleProvinsiChange={handleProvinsiChange}
          handleKabupatenChange={handleKabupatenChange}
          handleKecamatanChange={handleKecamatanChange}
          provinsi={provinsi}
          kabupaten={kabupaten}
          kecamatan={kecamatan}
          kelurahan={kelurahan}
        />

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

