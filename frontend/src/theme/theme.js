import { extendTheme } from '@chakra-ui/react';

// Template warna PMI dengan tambahan hijau dan biru
const theme = extendTheme({
  colors: {
    pmiRed: {
      500: "#D22F27", // Merah PMI
    },
    greenAccent: {
      500: "#2ECC71", // Hijau Muda
      700: "#27AE60", // Hijau Gelap
    },
    blueAccent: {
      500: "#3498DB", // Biru Muda
      700: "#2980B9", // Biru Gelap
    },
    neutral: {
      100: "#FFFFFF", // Putih
      900: "#2C2C2C", // Warna gelap untuk teks
    },
  },
});

export default theme;
