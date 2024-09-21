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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';  // Gunakan Link dari react-router-dom
import { CheckCircleIcon } from '@chakra-ui/icons'; // Import Chakra Icons

function HomePage() {
  return (
    <Container maxW="container.lg" p={4}>
      {/* Bagian untuk Header dengan tombol login di kanan atas */}
      <HStack mb={4}>
        <Heading as="h1" color="teal.500">
          siDORA
        </Heading>
        <Spacer />
        {/* Gunakan Link dari react-router-dom untuk navigasi */}
        <Link to="/login">
          <Button colorScheme="teal" variant="outline">
            Login
          </Button>
        </Link>
      </HStack>

      {/* Konten utama halaman */}
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" mb={4} textAlign="center" color="teal.500">
          Selamat Datang di siDORA
        </Heading>
        <Text fontSize="lg" mb={4} textAlign="center">
          Berikut adalah informasi mengenai persyaratan untuk menjadi donor darah:
        </Text>

        <VStack spacing={4} align="start">
          <Heading as="h3" size="md" color="teal.400" mt={4}>
            Syarat Umum Donor Darah:
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Berusia 17 hingga 65 tahun.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Berat badan minimal 45 kg.
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Tekanan darah normal (sistolik: 110-160 mmHg, diastolik: 70-100 mmHg).
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              Hemoglobin minimal 12,5 g/dL untuk wanita dan 13,0 g/dL untuk pria.
            </ListItem>
          </List>
        </VStack>
      </Box>
    </Container>
  );
}

export default HomePage;
