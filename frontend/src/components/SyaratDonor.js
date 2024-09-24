import { VStack, Heading, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const SyaratDonor = () => (
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
);

export default SyaratDonor;
