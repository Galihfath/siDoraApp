// Navbar.js
import { Box, Flex, HStack, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Avatar, Menu, MenuButton, MenuList, MenuItem, Text, Spacer, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Navbar = ({ scrollMessage, handleLogout, userName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="fixed" width="100%" top="0" zIndex="999" bg="greenAccent.500"> {/* Navbar dengan posisi fixed */}
      <Flex alignItems="center" px={4} py={2} color="white">
        {/* Icon untuk membuka menu drawer di sisi kiri */}
        <IconButton icon={<HamburgerIcon />} aria-label="Open Menu" onClick={onOpen} variant="ghost" colorScheme="whiteAlpha" mr={4} />

        {/* Drawer untuk menu samping */}
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

        {/* Logo PMI dan Logo siDORA */}
        <HStack spacing={4}>
          <HStack spacing={2}>
            <Avatar src="/path-to-pmi-logo.png" size="sm" />
            <Box>
              <Text fontSize="sm" fontWeight="bold">Palang Merah</Text>
              <Text fontSize="sm" fontWeight="bold">Indonesia</Text>
            </Box>
          </HStack>
          <Spacer />
          <HStack>
            <Text fontSize="lg" fontWeight="bold">siDORA</Text>
          </HStack>
        </HStack>

        <Spacer />

        {/* Pesan bergerak */}
        <Box ml={4} overflow="hidden" whiteSpace="nowrap" flexGrow={1}>
          <Text as="marquee" fontSize="sm" color="yellow.300">
            {scrollMessage}
          </Text>
        </Box>

        {/* Menu Profil */}
        <Menu>
        <MenuButton>
          <HStack spacing={2} align="center"> {/* Gunakan HStack untuk menyusun Avatar dan Text dalam satu baris */}
            <Avatar src="/path-to-user-avatar.png" size="sm" />
            <Text>{userName}</Text>
          </HStack>
        </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/profile" color="green.500">Profile</MenuItem>
            <MenuItem color="red.500" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
