import React, { useState } from 'react';
import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
} from '@chakra-ui/react';

const questions = [
  "Merasa sehat pada hari ini?",
  "Sedang minum antibiotik?",
  "Minum obat lain untuk infeksi?",
  "Sedang minum aspirin atau obat yang mengandung aspirin?",
  "Mengalami sakit kepala dan demam?",
  "Untuk donor wanita: apakah sedang hamil? Jika Ya, kehamilan keberapa?",
  "Mendonorkan darah, trombosit, atau plasma?",
  "Pernah di-tato atau tindik selama 3 bulan terakhir?",
  "Berhubungan dengan orang yang menerima vaksinasi smallpox?",
  "Mendonorkan darah 2 kantong dalam 1 kali kunjungan?",
  "Mendapatkan transfusi darah?",
  "Patah tulang dalam 12 bulan terakhir?",
  "Cangkok kulit atau organ tubuh lainnya?",
  "Pernah transfusi sumsum tulang?",
  "Berhubungan dengan orang yang menderita HIV/AIDS?",
  "Berhubungan dengan orang yang mengidap Hepatitis?",
  "Berhubungan dengan orang yang menggunakan obat-obatan terlarang?",
  "Pernah dirawat karena penyakit hati?",
  "Menderita penyakit Hepatitis?",
  "Tes HIV Anda pernah positif?",
  "Menderita penyakit kelamin (Gonorrhea, Herpes)?",
  "Mendapatkan vaksinasi selama 2 bulan terakhir?",
  "Pernah ke dokter gigi atau bekam?",
  "Berhubungan dengan orang yang menderita demam tifoid?",
  "Apakah Anda pernah di penjara?",
  "Berada di luar wilayah Indonesia dalam 3 bulan terakhir?",
  "Pernah tinggal di Inggris pada tahun 1980-1996?",
  "Pernah tinggal di Eropa atau Afrika Selatan sejak tahun 1980?",
  "Pernah transfusi darah sejak 1980?",
  "Mendapatkan hormon untuk pertumbuhan?",
  "Pernah menerima atau menggunakan hormon?",
  "Pernah mendapatkan steroid?",
  "Menggunakan produk darah?",
  "Pernah didiagnosa dengan penyakit darah?",
  "Pernah menerima cangkok jantung atau paru-paru?",
  "Pernah menerima atau berhubungan dengan orang yang menerima plasma?",
  "Pernah menerima transplantasi jaringan dari donor?",
  "Pernah tinggal di negara tropis?",
  "Pernah ke rumah sakit dalam 12 bulan terakhir?",
  "Pernah menderita penyakit jantung?",
  "Pernah menderita penyakit paru-paru?",
];

const DonorQuestionnaire = () => {
  const [answers, setAnswers] = useState(questions.map(() => '')); // Mengatur jawaban default sebagai string kosong

  // Fungsi untuk menangani perubahan jawaban
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <Box p={8} bg="gray.50">
      <Heading size="lg" mb={4} textAlign="center">
        Formulir Donor Darah
      </Heading>
      <Table variant="simple" bg="white" shadow="lg" borderRadius="md" border="2px" borderColor="gray.500">
        <Thead bg="gray.200">
          <Tr>
            <Th border="2px" borderColor="gray.500">No</Th>
            <Th border="2px" borderColor="gray.500">Pertanyaan</Th>
            <Th border="2px" borderColor="gray.500" textAlign="center">Ya</Th>
            <Th border="2px" borderColor="gray.500" textAlign="center">Tidak</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions.map((question, index) => (
            <Tr key={index}>
              <Td border="2px" borderColor="gray.500">{index + 1}</Td>
              <Td border="2px" borderColor="gray.500">{question}</Td>
              <Td border="2px" borderColor="gray.500" textAlign="center">
                <RadioGroup value={answers[index]} onChange={(value) => handleAnswerChange(index, value)}>
                  <Radio value="Ya" colorScheme="green">Ya</Radio>
                </RadioGroup>
              </Td>
              <Td border="2px" borderColor="gray.500" textAlign="center">
                <RadioGroup value={answers[index]} onChange={(value) => handleAnswerChange(index, value)}>
                  <Radio value="Tidak" colorScheme="green">Tidak</Radio>
                </RadioGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DonorQuestionnaire;
