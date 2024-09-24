import { Flex, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, HStack, Avatar, Divider, Heading, Box, Text, Spacer, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';

const Navbar = ({ scrollMessage, handleLogout, userName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex bg="teal.500" p={4} color="white" alignItems="center">
      <IconButton icon={<HamburgerIcon />} aria-label="Open Menu" onClick={onOpen} variant="ghost" colorScheme="whiteAlpha" mr={4} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={4} mt={10}>
              <Link to="/daftar-donor">Daftar Donor Darah</Link>
              <Link to="/jadwal-donor">Jadwal Donor Darah</Link>
              <Link to="/riwayat-donor">Riwayat Donor</Link>
              <Link to="/kartu-donor">Kartu Donor Darah</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <HStack spacing={4}>
        <HStack spacing={2}>
          <Avatar src="/path-to-pmi-logo.png" size="sm" />
          <Box>
            <Text fontSize="sm" fontWeight="bold">Palang Merah</Text>
            <Text fontSize="sm" fontWeight="bold">Indonesia</Text>
          </Box>
        </HStack>
        <Divider orientation="vertical" borderColor="white" height="40px" />
        <HStack spacing={2}>
          <Avatar src="/path-to-sidora-logo.png" size="sm" />
          <Heading as="h1" size="lg">siDORA</Heading>
        </HStack>
      </HStack>

      <Spacer />
      <Box ml={4} overflow="hidden" whiteSpace="nowrap" flexGrow={1}>
        <Text as="marquee" fontSize="sm" color="yellow.300">
          {scrollMessage}
        </Text>
      </Box>

      <Menu>
        <MenuButton>
          <Avatar src="/path-to-user-avatar.png" size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} to="/profile" color="green.500">Profile</MenuItem>
          <MenuItem color="red.500" onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <Text ml={4}>{userName}</Text>
    </Flex>
  );
};

export default Navbar;
