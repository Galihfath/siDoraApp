// Navbar.js
import React from 'react';
import {
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Avatar,
  Divider,
  Heading,
  Box,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';

const Navbar = ({ scrollMessage, handleLogout, userName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex bg="pmiRed.500" p={4} color="white" alignItems="center" shadow="md" position="fixed" width="100%" zIndex="999">
      {/* IconButton untuk membuka Drawer (Menu Samping) */}
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        onClick={onOpen}
        variant="outline"
        color="white"
        border="1px solid"
        borderColor="whiteAlpha.300"
        mr={4}
      />
      
      {/* Drawer untuk menu navigasi */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="start" spacing={6} mt={10} color="pmiRed.500">
              <Link to="/daftar-donor">Daftar Donor Darah</Link>
              <Link to="/jadwal-donor">Jadwal Donor Darah</Link>
              <Link to="/riwayat-donor">Riwayat Donor</Link>
              <Link to="/kartu-donor">Kartu Donor Darah</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Bagian Tengah Navbar */}
      <HStack spacing={4}>
        {/* Logo PMI */}
        <HStack spacing={2}>
          <Avatar src="/path-to-pmi-logo.png" size="sm" bg="white" />
          <Box lineHeight="shorter">
            <Text fontSize="sm" fontWeight="bold">Palang Merah</Text>
            <Text fontSize="sm" fontWeight="bold">Indonesia</Text>
          </Box>
        </HStack>
        
        {/* Divider Vertikal */}
        <Divider orientation="vertical" borderColor="whiteAlpha.700" height="40px" />

        {/* Logo siDORA */}
        <HStack as={Link} to="/dashboard" spacing={2}>
          <Avatar src="/path-to-sidora-logo.png" size="sm" bg="white" />
          <Heading as="h1" size="md" color="neutral.50">siDORA</Heading>
        </HStack>
      </HStack>

      {/* Marquee atau Pesan Berjalan */}
      <Box ml={4} flexGrow={1} overflow="hidden" whiteSpace="nowrap">
        <Text as="marquee" fontSize="sm" color="yellow.300" fontWeight="bold">
          {scrollMessage}
        </Text>
      </Box>

      {/* Menu Dropdown untuk User Profile */}
      <Menu>
        <MenuButton>
          <Avatar src="/path-to-user-avatar.png" size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} to="/profile" color="blueAccent.500">Profile</MenuItem>
          <MenuItem color="red.500" onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>

      {/* Nama User */}
      <Text ml={4} fontWeight="bold" color="neutral.50">{userName}</Text>
    </Flex>
  );
};

export default Navbar;
