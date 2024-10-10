// HomePage.js
import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Container,
  HStack,
  Spacer,
  Button,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Gunakan Link dari react-router-dom
import { CheckCircleIcon } from '@chakra-ui/icons'; // Import Chakra Icons

function HomePage() {
  return (
    <Box bg="rgba(255, 255, 255, 0.5)" minHeight="100vh" py={10}> {/* Latar belakang yang lebih terang */}
      <Container maxW="container.lg">
        {/* Bagian untuk Header dengan tombol login di kanan atas */}
        <HStack mb={8}>
          <Heading as="h1" color="pmiRed.500" fontWeight="bold" size="lg">
            siDORA
          </Heading>
          <Spacer />
          {/* Gunakan Link dari react-router-dom untuk navigasi */}
          <Link to="/login">
            <Button colorScheme="pmiRed" variant="outline" size="md">
              Login
            </Button>
          </Link>
        </HStack>

        {/* Konten utama halaman */}
        <Box bg="white" p={8} rounded="md" shadow="lg">
          <Heading as="h2" mb={6} textAlign="center" color="pmiRed.500">
            Selamat Datang di siDORA
          </Heading>
          <Text fontSize="lg" mb={6} textAlign="center" color="neutral.700">
            Berikut adalah informasi mengenai persyaratan untuk menjadi donor darah:
          </Text>

          {/* Daftar syarat donor darah */}
          <VStack spacing={4} align="start">
            <Heading as="h3" size="md" color="pmiRed.400">
              Syarat Umum Donor Darah:
            </Heading>
            <Divider borderColor="pmiRed.300" />
            <List spacing={3} pl={4}>
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
          </VStack>
        </Box>

        {/* Bagian Footer */}
        <Box textAlign="center" mt={10} color="neutral.700">
          <Text>&copy; {new Date().getFullYear()} siDORA. All Rights Reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
