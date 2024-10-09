// SyaratDonor.js
import React from 'react';
import { VStack, Heading, List, ListItem, ListIcon, Box } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const SyaratDonor = () => (
  <VStack spacing={4} align="start" bg="white" p={6} borderRadius="md" shadow="lg" width="100%" maxW="600px" mx="auto">
    {/* Heading dengan warna tema baru */}
    <Heading as="h3" size="lg" color="pmiRed.500" borderBottom="2px solid" borderColor="pmiRed.300" pb={2}>
      Syarat Umum Donor Darah
    </Heading>
    
    {/* Daftar syarat donor darah */}
    <List spacing={4} pl={4}>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="greenAccent.500" />
        Berusia 17 hingga 65 tahun.
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="greenAccent.500" />
        Berat badan minimal 45 kg.
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="greenAccent.500" />
        Tekanan darah normal (sistolik: 110-160 mmHg, diastolik: 70-100 mmHg).
      </ListItem>
      <ListItem>
        <ListIcon as={CheckCircleIcon} color="greenAccent.500" />
        Hemoglobin minimal 12,5 g/dL untuk wanita dan 13,0 g/dL untuk pria.
      </ListItem>
    </List>
    
    {/* Tambahan catatan atau informasi lain */}
    <Box mt={4} p={4} bg="blueAccent.50" borderRadius="md" border="1px solid" borderColor="blueAccent.200" w="100%">
      <Heading as="h4" size="sm" color="blueAccent.700" mb={2}>Catatan:</Heading>
      <List spacing={2}>
        <ListItem>1. Tidak sedang hamil atau menyusui.</ListItem>
        <ListItem>2. Tidak memiliki riwayat penyakit serius seperti hepatitis atau HIV/AIDS.</ListItem>
        <ListItem>3. Tidak mengonsumsi obat-obatan terlarang atau alkohol dalam 24 jam terakhir.</ListItem>
      </List>
    </Box>
  </VStack>
);

export default SyaratDonor;
