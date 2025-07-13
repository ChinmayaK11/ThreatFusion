import React, { useState } from 'react';
import axios from 'axios';
import IPMap from './IPMap';
import './IPLookup.css';

const IPLookup = () => {
  const [ip, setIP] = useState('');
  const [ipData, setIPData] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored here
      const res = await axios.get(`http://localhost:5000/api/ip/${ip}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIPData(res.data);
      setError('');
    } catch (err) {
      setError('IP lookup failed');
      setIPData(null);
    }
  };

  return (
    <div className="ip-lookup max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">🌐 IP Geolocation Lookup</h2>

      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIP(e.target.value)}
          placeholder="Enter IP (e.g., 8.8.8.8)"
          className="border px-3 py-2 rounded w-full sm:w-auto flex-grow"
        />
        <button
          onClick={handleLookup}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Lookup
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {ipData && (
        <div className="bg-white shadow-md rounded p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">📋 IP Details & Map</h3>

          {/* Flex container for side-by-side layout */}
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* IP Info Section */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">IP:</span> {ipData.ip}</div>
                <div><span className="font-medium">Country:</span> {ipData.country}</div>
                <div><span className="font-medium">Region:</span> {ipData.region}</div>
                <div><span className="font-medium">City:</span> {ipData.city}</div>
                <div><span className="font-medium">Organization:</span> {ipData.org}</div>
                <div><span className="font-medium">Location (lat,lng):</span> {ipData.loc}</div>
                <div><span className="font-medium">Timezone:</span> {ipData.timezone}</div>
              </div>
            </div>
            <br />
            {/* Map Section */}
            <div className="flex-1">
              <div className="w-full h-64 md:h-full">
                <IPMap ipData={ipData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPLookup;
