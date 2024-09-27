import React, { useState, useEffect } from "react";
import { ThreeDot } from 'react-loading-indicators'; // Pastikan ini sudah di-install
import './BloodLoading.css'

// Komponen SkeletonLoader untuk placeholder loading
const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
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
    <div>
      {/* Jika loading, tampilkan overlay dengan efek skeleton */}
      {isLoading && (
        <div className="loading-overlay">
          <ThreeDot
            variant="brick-stack"
            color={["#8B0000", "#CC3131", "#006400", "#FFFFFF"]}
            size="medium"
            text="Loading"
            textColor="#cc3131"
          />
        </div>
      )}

      {/* Halaman lama atau halaman baru, dengan skeleton ketika loading */}
      <div className={`content ${isLoading ? "blurred" : ""}`}>
        {isLoading ? (
          <SkeletonLoader /> // Tampilkan skeleton selama loading
        ) : (
          <div>
            <h1>{pageData}</h1>
            <p>Ini adalah halaman yang menunggu halaman baru dimuat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodLoading;
