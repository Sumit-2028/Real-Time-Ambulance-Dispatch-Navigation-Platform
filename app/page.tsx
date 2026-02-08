'use client';

import { useState, useEffect } from 'react';
import MapPanel from '@/components/MapPanel';
import StatusPanel from '@/components/StatusPanel';
import DispatchQueue from '@/components/DispatchQueue';
import TrafficIndicator from '@/components/TrafficIndicator';

export default function Home() {
  const [ambulances, setAmbulances] = useState([
    { id: 'AMB-001', status: 'active', eta: 4.2, location: 'Downtown District', traffic: 'medium' },
    { id: 'AMB-002', status: 'active', eta: 6.8, location: 'North Ward', traffic: 'high' },
    { id: 'AMB-003', status: 'idle', eta: null, location: 'Hospital Station', traffic: null },
    { id: 'AMB-004', status: 'active', eta: 3.5, location: 'Central Area', traffic: 'low' },
  ]);

  const [selectedAmbulance, setSelectedAmbulance] = useState('AMB-001');
  const [systemStats, setSystemStats] = useState({
    activeAmbulances: 3,
    totalDispatches: 156,
    avgResponseTime: 5.4,
    systemLoad: 68,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Emergency Dispatch</h1>
              <p className="text-xs text-muted">Real-time Routing & Navigation</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-sm text-muted">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Dispatch Queue */}
        <div className="w-80 border-r border-border bg-card/30 overflow-y-auto hidden lg:block">
          <DispatchQueue ambulances={ambulances} selectedId={selectedAmbulance} onSelect={setSelectedAmbulance} />
        </div>

        {/* Center - Map */}
        <div className="flex-1 relative">
          <MapPanel selectedAmbulance={selectedAmbulance} />
        </div>

        {/* Right Sidebar - Status Panels */}
        <div className="w-96 border-l border-border bg-card/30 overflow-y-auto hidden xl:block">
          <StatusPanel ambulances={ambulances} selectedAmbulance={selectedAmbulance} systemStats={systemStats} />
        </div>
      </div>
    </div>
  );
}
