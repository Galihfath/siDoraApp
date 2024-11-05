// src/components/LocationSelector.js
import React from 'react';
import FormField from './FormField';

const LocationSelector = ({ formData, handleInputChange, handleProvinsiChange, handleKabupatenChange, handleKecamatanChange, provinsi, kabupaten, kecamatan, kelurahan }) => {
  return (
    <>
      <FormField label="Provinsi" name="provinsi" isSelect options={provinsi.map((prov) => ({
        label: prov.nama, value: prov.id
      }))} value={formData.provinsi} onChange={handleProvinsiChange} />
      <FormField label="Kabupaten/Kota" name="kota" isSelect options={kabupaten.map((kab) => ({
        label: kab.nama, value: kab.id
      }))} value={formData.kota} onChange={handleKabupatenChange} />
      <FormField label="Kecamatan" name="kecamatan" isSelect options={kecamatan.map((kec) => ({
        label: kec.nama, value: kec.id
      }))} value={formData.kecamatan} onChange={handleKecamatanChange} />
      <FormField label="Kelurahan/Desa" name="kelurahan" isSelect options={kelurahan.map((kel) => ({
        label: kel.nama, value: kel.id
      }))} value={formData.kelurahan} onChange={handleInputChange} />
    </>
  );
};

export default LocationSelector;
