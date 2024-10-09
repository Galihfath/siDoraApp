// theme.js
import { extendTheme } from '@chakra-ui/react';

// Template warna PMI dengan tambahan hijau dan biru serta penyesuaian untuk RS Persahabatan
const theme = extendTheme({
  colors: {
    pmiRed: {
      50: "#FFEBE9",
      100: "#FFC8C6",
      200: "#FFA39D",
      300: "#FF7B75",
      400: "#FF524D",
      500: "#D22F27", // Merah PMI (Utama)
      600: "#B62721",
      700: "#8A1E19",
      800: "#5E1511",
      900: "#310B09",
    },
    greenAccent: {
      50: "#EAF8F1",
      100: "#C6ECD8",
      200: "#A1E1BF",
      300: "#7BD5A5",
      400: "#56C98C",
      500: "#2ECC71", // Hijau Muda
      600: "#27AE60", // Hijau Gelap
      700: "#1F8D4F",
      800: "#176B3D",
      900: "#0F4A2C",
    },
    blueAccent: {
      50: "#EAF4FD",
      100: "#C9E2FB",
      200: "#A8D1F8",
      300: "#87BFF6",
      400: "#66ADF3",
      500: "#3498DB", // Biru Muda (Utama)
      600: "#2980B9", // Biru Gelap
      700: "#216697",
      800: "#184C74",
      900: "#0F3352",
    },
    neutral: {
      50: "#F7F7F7",   // Abu-abu terang
      100: "#ECECEC",  // Abu-abu lebih terang
      200: "#D1D1D1",  // Abu-abu medium
      300: "#B6B6B6",
      400: "#9C9C9C",
      500: "#818181",
      600: "#666666",
      700: "#4C4C4C",
      800: "#323232",
      900: "#2C2C2C",  // Warna gelap untuk teks
    },
  },
  fonts: {
    heading: "'Roboto', sans-serif", // Font untuk heading
    body: "'Open Sans', sans-serif", // Font untuk body
  },
  styles: {
    global: {
      "html, body": {
        color: "neutral.900", // Warna teks utama
        bg: "neutral.50", // Warna latar belakang
      },
      a: {
        color: "blueAccent.500", // Warna default link
        _hover: {
          color: "blueAccent.700", // Warna hover link
        },
      },
    },
  },
});

export default theme;
