// components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mengatur ikon default Leaflet agar dapat terlihat di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Style peta
const mapStyle = { width: '100%', height: '400px' };

// Koordinat RS Persahabatan
const rsPersahabatanPosition = {
  lat: -6.2015,
  lng: 106.8739,
};

const MapComponent = () => {
  return (
    <MapContainer center={rsPersahabatanPosition} zoom={16} style={mapStyle}>
      {/* TileLayer dari OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker untuk RS Persahabatan */}
      <Marker position={rsPersahabatanPosition}>
        <Popup>
          RS Persahabatan, Jakarta Timur
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
