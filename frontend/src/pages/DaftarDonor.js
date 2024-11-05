// src/pages/DaftarDonor.js
import React, { useState } from 'react';
import { Box, Heading, Button, VStack, HStack, Text, Checkbox, Textarea, useToast, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '../components/Breadcrumb'; // Import komponen Breadcrumb
import Profile from './Profile'
import DonorQuestionnaire from '../components/DonorQuestionnaire';

const DaftarDonor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    confirmation: false, // Untuk konfirmasi pendonor
    questions: {}, // Untuk menyimpan jawaban formulir
    agreement: false, // Untuk persetujuan akhir
  });
  const toast = useToast();
  const navigate = useNavigate();

  // List tahapan pendaftaran
  const steps = ['Konfirmasi Data Profil', 'Formulir Donor Darah', 'Persetujuan dan Konfirmasi'];

  // Fungsi untuk mengubah nilai jawaban formulir
  const handleCheckboxChange = (questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: {
        ...prev.questions,
        [questionId]: value,
      },
    }));
  };

  // Fungsi untuk mengubah persetujuan
  const handleAgreementChange = () => {
    setFormData((prev) => ({
      ...prev,
      agreement: !prev.agreement,
    }));
  };

  // Fungsi untuk navigasi sesi
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fungsi untuk submit data
  const handleSubmit = () => {
    if (formData.agreement) {
      toast({
        title: 'Pendaftaran Berhasil',
        description: 'Anda berhasil mendaftar sebagai donor.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard'); // Redirect ke dashboard setelah submit
    } else {
      toast({
        title: 'Pendaftaran Gagal',
        description: 'Anda harus menyetujui persyaratan.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh" p={8}>
      <BreadcrumbComponent steps={steps} currentStep={currentStep} />
      {/* Tahap 1: Konfirmasi Data Profil */}
      {currentStep === 0 && (
        <Box bg="rgba(255, 255, 255, 0.5)" p={8} rounded="lg" shadow="lg">
          <VStack>
            <Profile />
            <Button mt={6} colorScheme="teal" onClick={handleNextStep}>
              Konfirmasi Pendonor
            </Button>
          </VStack>
        </Box>
      )}

      {/* Tahap 2: Formulir Donor Darah */}
      {currentStep === 1 && (
        <Box bg="rgba(255, 255, 255, 0.5)" p={8} rounded="lg" shadow="lg">
          <Heading size="lg" mb={4}>Formulir Donor Darah</Heading>
          <VStack spacing={4} align="stretch">
            <DonorQuestionnaire/>
            <Button mt={6} colorScheme="teal" onClick={handleNextStep}>
              Lanjutkan
            </Button>
            <Button mt={6} colorScheme="gray" onClick={handlePreviousStep} ml={4}>
              Kembali
            </Button>
          </VStack>
        </Box>
      )}

      {/* Tahap 3: Persetujuan dan Konfirmasi */}
      {currentStep === 2 && (
        <Box p={8} bg="rgba(255, 255, 255, 0.8)" rounded="md" shadow="lg">
          <Heading size="lg" mb={6} color="pmiRed.500" textAlign="center">
          Informed Consent Donor
          </Heading>
  
          {/* Informasi Informed Consent */}
          <VStack spacing={4} align="start">
            <Text>
              Saya telah mendapatkan dan membaca semua informasi yang diberikan serta menyetujui diambilnya darah saya
              untuk keperluan pemeriksaan laboratorium guna kepentingan keselamatan penerima darah dan kesehatan saya
              sendiri.
            </Text>
            <Text>
              Saya mengerti dan bersedia menyumbangkan darah dengan sukarela dan setuju digunakan untuk pemeriksaan
              golongan darah, HIV, Hepatitis B, Hepatitis C, dan infeksi lainnya yang diperlukan.
            </Text>
            <Text>
              Jika komponen plasma tidak terpakai untuk transfusi, saya setuju digunakan untuk dijadikan produk plasma
              untuk pengobatan.
            </Text>
          </VStack>
  
          <Divider my={6} />
  
          {/* Persetujuan Checkbox */}
          <Checkbox size="lg" colorScheme="teal">
            Saya setuju dengan informasi yang telah diberikan dan bersedia menjadi pendonor darah.
          </Checkbox>
  
          {/* Tombol Navigasi */}
          <VStack spacing={4} mt={6}>
            <Button mt={6} colorScheme="gray" onClick={handlePreviousStep} ml={4}>
              Sebelumnya
            </Button>
            <Button colorScheme="red" width="full" onClick={() => alert('Terima kasih telah mengisi persetujuan')}>
              Daftar Donor Darah
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default DaftarDonor;
