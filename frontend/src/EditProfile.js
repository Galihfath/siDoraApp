// EditProfile.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, FormControl, FormLabel, Input, Container } from '@chakra-ui/react';
import FormField from './components/FormField'; // Import komponen FormField
import Navbar from './components/Navbar'; // Import Navbar
import { useNavigate } from 'react-router-dom';

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
    noHp: ''
  });

  // State untuk menyimpan daftar lokasi wilayah
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Mengambil nama user dari local storage dan data provinsi
  useEffect(() => {
    const storedName = localStorage.getItem('name') || 'User';
    setUserName(storedName);

    // Fetch data provinsi dari API
    fetch('https://ibnux.github.io/data-indonesia/provinsi.json')
      .then((response) => response.json())
      .then((data) => setProvinsi(data));

    // Mengambil data profil pengguna dari API
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) { // Gunakan response dengan benar di dalam scope
          setFormData(data); // Set data dari backend ke formData
        } else {
          console.error('Gagal mengambil data profil:', data.message);
        }
      } catch (error) {
        console.error('Gagal mengambil data profil:', error);
      }
    };

    fetchProfile();
  }, []);

  // Mengambil data kabupaten berdasarkan provinsi yang dipilih
  const handleProvinsiChange = (e) => {
    const provId = e.target.value;
    setFormData({ ...formData, provinsi: provId });

    // Fetch data Kabupaten/Kota
    fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${provId}.json`)
      .then((response) => response.json())
      .then((data) => setKabupaten(data));
  };

  // Mengambil data kecamatan berdasarkan kabupaten yang dipilih
  const handleKabupatenChange = (e) => {
    const kabId = e.target.value;
    setFormData({ ...formData, kota: kabId });

    // Fetch data Kecamatan
    fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${kabId}.json`)
      .then((response) => response.json())
      .then((data) => setKecamatan(data));
  };

  // Mengambil data kelurahan berdasarkan kecamatan yang dipilih
  const handleKecamatanChange = (e) => {
    const kecId = e.target.value;
    setFormData({ ...formData, kecamatan: kecId });

    // Fetch data Kelurahan
    fetch(`https://ibnux.github.io/data-indonesia/kelurahan/${kecId}.json`)
      .then((response) => response.json())
      .then((data) => setKelurahan(data));
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
        navigate('/profile');
      } else {
        alert('Gagal memperbarui profil');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memperbarui profil:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <Box bg="neutral.50" minHeight="100vh"> {/* Latar belakang yang lebih terang */}
      {/* Navbar dengan pesan scroll */}
      <Navbar scrollMessage="Ayo Donor Darah!" handleLogout={() => navigate('/login')} />

      {/* Kontainer utama untuk formulir */}
      <Container maxW="container.sm" mt={10} p={6} bg="white" borderRadius="md" shadow="lg">
        <Heading as="h2" mb={8} textAlign="center" color="pmiRed.500">
          Edit Profil
        </Heading>
        
        <VStack spacing={4} align="stretch">
          {/* Nama Lengkap (Readonly) */}
          <FormControl id="name" isReadOnly>
            <FormLabel>Nama Lengkap</FormLabel>
            <Input name="name" value={userName} readOnly />
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
