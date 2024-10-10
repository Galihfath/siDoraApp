// src/utils/fetchData.js
const fetchData = async (endpoint, method = 'GET', options = {}) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', ...options.headers },
        body: method !== 'GET' ? JSON.stringify(options.body) : null,
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Kembalikan data JSON dari response
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Throw error agar dapat ditangani di komponen yang memanggil
    }
  };
  
  export default fetchData;
  