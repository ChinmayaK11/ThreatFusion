import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './IPMap.css';

// ✅ Import icons using ES module syntax
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ✅ Fix leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const IPMap = ({ ipData }) => {
  if (!ipData?.loc) return <p>No location data found</p>;

  const [lat, lon] = ipData.loc.split(',').map(Number);
  if (isNaN(lat) || isNaN(lon)) return <p>Invalid location data</p>;

  return (
    <div className="map-wrapper">
      <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} className="leaflet-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            <b>IP:</b> {ipData.ip}<br />
            <b>City:</b> {ipData.city}<br />
            <b>Org:</b> {ipData.org}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default IPMap;
