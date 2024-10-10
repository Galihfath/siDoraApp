// src/utils/locationServices.js

// Fungsi untuk mengambil data provinsi dari API
export const fetchProvinsi = async () => {
    try {
      const response = await fetch('https://ibnux.github.io/data-indonesia/provinsi.json');
      if (!response.ok) {
        throw new Error('Gagal mengambil data provinsi');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching provinsi:', error);
      throw error;
    }
  };
  
  // Fungsi untuk mengambil data kabupaten/kota berdasarkan ID provinsi
  export const fetchKabupaten = async (provId) => {
    try {
      const response = await fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${provId}.json`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data kabupaten');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching kabupaten:', error);
      throw error;
    }
  };
  
  // Fungsi untuk mengambil data kecamatan berdasarkan ID kabupaten
  export const fetchKecamatan = async (kabId) => {
    try {
      const response = await fetch(`https://ibnux.github.io/data-indonesia/kecamatan/${kabId}.json`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data kecamatan');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching kecamatan:', error);
      throw error;
    }
  };
  
  // Fungsi untuk mengambil data kelurahan berdasarkan ID kecamatan
  export const fetchKelurahan = async (kecId) => {
    try {
      const response = await fetch(`https://ibnux.github.io/data-indonesia/kelurahan/${kecId}.json`);
      if (!response.ok) {
        throw new Error('Gagal mengambil data kelurahan');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching kelurahan:', error);
      throw error;
    }
  };
  