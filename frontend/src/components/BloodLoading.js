import React, { useState, useEffect } from "react";
import { ThreeDot } from 'react-loading-indicators'; // Pastikan ini sudah di-install
import './BloodLoading.css';
import { Box, Text, Center } from "@chakra-ui/react"; // Menggunakan Chakra UI untuk styling

// Komponen SkeletonLoader untuk placeholder loading
const SkeletonLoader = () => {
  return (
    <Box className="skeleton-container" display="flex" flexDirection="column" gap="12px" p="20px" borderRadius="md" boxShadow="lg" bg="white">
      <Box className="skeleton skeleton-title" height="20px" width="60%" bg="neutral.200" borderRadius="md" />
      <Box className="skeleton skeleton-text" height="16px" width="80%" bg="neutral.200" borderRadius="md" />
      <Box className="skeleton skeleton-text" height="16px" width="80%" bg="neutral.200" borderRadius="md" />
      <Box className="skeleton skeleton-text" height="16px" width="80%" bg="neutral.200" borderRadius="md" />
    </Box>
  );
};

const BloodLoading = () => {
  // State untuk mengontrol loading dan konten halaman
  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState("Ini adalah konten dari halaman sebelumnya.");

  // Simulasi proses loading selama 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageData("Ini adalah konten dari halaman baru."); // Data baru setelah loading selesai
      setIsLoading(false);
    }, 3000); // Loading selama 3 detik
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box position="relative" minHeight="100vh" bg="neutral.50">
      {/* Jika loading, tampilkan overlay dengan efek skeleton */}
      {isLoading && (
        <Center className="loading-overlay" position="fixed" top="0" left="0" w="100%" h="100%" bg="rgba(255, 255, 255, 0.7)" zIndex="1000">
          <ThreeDot
            variant="brick-stack"
            color={["#D22F27", "#CC3131", "#2ECC71", "#3498DB"]}
            size="large"
            text="Loading"
            textColor="#D22F27"
          />
        </Center>
      )}

      {/* Halaman lama atau halaman baru, dengan skeleton ketika loading */}
      <Box className={`content ${isLoading ? "blurred" : ""}`} p="40px" textAlign="center">
        {isLoading ? (
          <SkeletonLoader /> // Tampilkan skeleton selama loading
        ) : (
          <Box>
            <Text fontSize="2xl" color="blueAccent.500" fontWeight="bold">{pageData}</Text>
            <Text mt="20px" color="neutral.700">Ini adalah halaman yang menunggu halaman baru dimuat.</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BloodLoading;
