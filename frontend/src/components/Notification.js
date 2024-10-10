// components/Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {
  // Fungsi untuk menampilkan notifikasi sukses
  const notifySuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Durasi notifikasi ditutup otomatis
    });
  };

  // Fungsi untuk menampilkan notifikasi error
  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Fungsi untuk menampilkan notifikasi info
  const notifyInfo = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  // Contoh penggunaan (kamu bisa memanggil fungsi ini dari komponen lain)
  React.useEffect(() => {
    notifySuccess('Selamat datang di aplikasi siDORA!');
  }, []);

  return <ToastContainer />;
};

export default Notification;
