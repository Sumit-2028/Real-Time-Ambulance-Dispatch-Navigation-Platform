'use client';

interface Ambulance {
  id: string;
  status: 'active' | 'idle' | 'unavailable';
  eta: number | null;
  location: string;
  traffic: string | null;
}

interface StatusPanelProps {
  ambulances: Ambulance[];
  selectedAmbulance: string;
  systemStats: {
    activeAmbulances: number;
    totalDispatches: number;
    avgResponseTime: number;
    systemLoad: number;
  };
}

export default function StatusPanel({ ambulances, selectedAmbulance, systemStats }: StatusPanelProps) {
  const selected = ambulances.find(a => a.id === selectedAmbulance);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border sticky top-0 bg-card/30 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-foreground">System Status</h2>
      </div>

      {/* Selected Ambulance Details */}
      {selected && (
        <div className="px-6 py-4 border-b border-border">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm font-semibold text-foreground">{selected.id}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted">Location</span>
                <span className="text-sm font-semibold text-foreground">{selected.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  selected.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {selected.status.toUpperCase()}
                </span>
              </div>
              {selected.eta && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted">ETA</span>
                  <span className="text-sm font-semibold text-primary">{selected.eta} min</span>
                </div>
              )}
              {selected.traffic && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted">Traffic</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    selected.traffic === 'low'
                      ? 'bg-green-500/20 text-green-400'
                      : selected.traffic === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selected.traffic.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* System Stats */}
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-bold text-foreground mb-4">System Metrics</h3>
        <div className="space-y-3">
          {/* Active Ambulances */}
          <div className="bg-card/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted">Active Units</span>
              <span className="text-lg font-bold text-green-400">{systemStats.activeAmbulances}</span>
            </div>
            <div className="w-full bg-card rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                style={{ width: `${(systemStats.activeAmbulances / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* System Load */}
          <div className="bg-card/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted">System Load</span>
              <span className="text-lg font-bold text-accent">{systemStats.systemLoad}%</span>
            </div>
            <div className="w-full bg-card rounded-full h-2">
              <div
                className="bg-gradient-to-r from-accent to-primary h-2 rounded-full"
                style={{ width: `${systemStats.systemLoad}%` }}
              ></div>
            </div>
          </div>

          {/* Avg Response Time */}
          <div className="bg-card/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Avg Response</span>
              <span className="text-lg font-bold text-primary">{systemStats.avgResponseTime} min</span>
            </div>
          </div>

          {/* Total Dispatches */}
          <div className="bg-card/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Total Dispatches</span>
              <span className="text-lg font-bold text-muted-foreground">{systemStats.totalDispatches}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Status */}
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-bold text-foreground mb-4">Traffic Conditions</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted">Low congestion</span>
            <span className="text-xs font-bold text-green-400 ml-auto">25%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-muted">Medium congestion</span>
            <span className="text-xs font-bold text-yellow-400 ml-auto">50%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-muted">High congestion</span>
            <span className="text-xs font-bold text-red-400 ml-auto">25%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 mt-auto">
        <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity mb-2">
          Dispatch Alert
        </button>
        <button className="w-full bg-card border border-border text-foreground py-2 rounded-lg font-semibold text-sm hover:bg-card/80 transition-colors">
          System Settings
        </button>
      </div>
    </div>
  );
}
