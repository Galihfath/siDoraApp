// src/components/Navbar.js
import React from 'react';
import { Flex, Text, HStack, Avatar, Menu, MenuButton, MenuList, MenuItem, Box, IconButton, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation dari react-router-dom
import { useDisclosure } from '@chakra-ui/hooks';
import { useUser } from '../context/UserContext'; // Import useUser untuk akses context


const Navbar = () => {
  const { userName, scrollMessage, handleLogout, isLoggedIn } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation(); // Dapatkan informasi rute saat ini

  // Pengecekan apakah Navbar perlu ditampilkan
  const hideNavbar = ['/login', '/register'].includes(location.pathname); // Navbar tidak ditampilkan di halaman Login, Register, dan HomePage

  if (hideNavbar) {
    return null; // Jika rutenya adalah login, register, atau home, tidak render Navbar
  }

  return (
    <Flex position="fixed" top="0" width="100%" bg="pmiRed.500" p={4} color="white" alignItems="center" zIndex="999">
      {/* Tombol untuk membuka Drawer */}
      <IconButton icon={<HamburgerIcon />} aria-label="Open Menu" onClick={onOpen} variant="ghost" colorScheme="whiteAlpha" mr={4} />

      {/* Drawer untuk navigasi sidebar */}
      {isLoggedIn ? (
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
      ) :(
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={4} mt={10}>
              <Link to="/daftar-donor">Daftar Donor Darah</Link>
              <Link to="/jadwal-donor">Jadwal Donor Darah</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      ) }

      {/* Logo dan Nama Aplikasi */}
      <Link to="/dashboard">
      <HStack spacing={4}>
        <Avatar src="/path-to-pmi-logo.png" size="sm" />
        <Box>
          <Text color="greenAccent.500" fontSize="xl" fontWeight="bold">SiDORA</Text>
        </Box>
      </HStack>
      </Link>

      {/* Scroll Message */}
      <Box ml={4} overflow="hidden" whiteSpace="nowrap" flexGrow={1}>
        <Text as="marquee" fontSize="sm" color="yellow.300">
          {scrollMessage}
        </Text>
      </Box>

      {isLoggedIn ? (
        <Menu>
          <MenuButton>
            <HStack spacing={2} align="center">
              <Avatar src="/path-to-user-avatar.png" size="sm" />
              <Text>{userName}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/profile" color="green.500">Profile</MenuItem>
            <MenuItem color="red.500" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link to="/login">
          <Button colorScheme="green" variant="solid">
            Login
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Navbar;
