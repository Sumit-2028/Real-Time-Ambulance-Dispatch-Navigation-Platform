'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for ambulances
const ambulanceIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzAwZDlmZiIvPjxwYXRoIGQ9Im0xMiA4di04TTEyIDE2djgiLz48cGF0aCBkPSJNOCAxMmg4Ii8+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const hospitalIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxMGI5ODEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzEwYjk4MSIvPjwvc3ZnPg==',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export default function MapPanel({ selectedAmbulance }: { selectedAmbulance: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const ambulanceLocations = [
    { id: 'AMB-001', lat: 12.9716, lng: 77.5946, name: 'Ambulance 001', status: 'active' },
    { id: 'AMB-002', lat: 12.9250, lng: 77.6245, name: 'Ambulance 002', status: 'active' },
    { id: 'AMB-003', lat: 12.9689, lng: 77.5906, name: 'Ambulance 003', status: 'idle' },
    { id: 'AMB-004', lat: 12.9550, lng: 77.6200, name: 'Ambulance 004', status: 'active' },
  ];

  const hospitals = [
    { id: 'HOSP-001', lat: 12.9716, lng: 77.5946, name: 'City General Hospital' },
    { id: 'HOSP-002', lat: 12.9250, lng: 77.6245, name: 'Central Medical Center' },
  ];

  return (
    <div className="relative w-full h-full">
      <MapContainer center={[12.9716, 77.5946]} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}.png"
          attribution='&copy; Stadia Maps'
        />

        {/* Hospitals */}
        {hospitals.map((hospital) => (
          <Marker key={hospital.id} position={[hospital.lat, hospital.lng]} icon={hospitalIcon}>
            <Popup>
              <div className="font-semibold text-sm">{hospital.name}</div>
              <div className="text-xs text-gray-600">Medical Facility</div>
            </Popup>
          </Marker>
        ))}

        {/* Ambulances */}
        {ambulanceLocations.map((ambulance) => (
          <Marker
            key={ambulance.id}
            position={[ambulance.lat, ambulance.lng]}
            icon={ambulanceIcon}
            opacity={selectedAmbulance === ambulance.id ? 1 : 0.6}
          >
            <Popup>
              <div className="font-semibold text-sm">{ambulance.name}</div>
              <div className={`text-xs ${ambulance.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                Status: {ambulance.status}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Overlay Info */}
      <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Coverage Area</h3>
            <p className="text-xs text-muted">Bangalore District - 4 active units</p>
          </div>
        </div>
      </div>
    </div>
  );
}
