'use client';

interface Ambulance {
  id: string;
  status: 'active' | 'idle' | 'unavailable';
  eta: number | null;
  location: string;
  traffic: string | null;
}

interface DispatchQueueProps {
  ambulances: Ambulance[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function DispatchQueue({ ambulances, selectedId, onSelect }: DispatchQueueProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground mb-1">Dispatch Queue</h2>
        <p className="text-xs text-muted">Priority-based routing</p>
      </div>

      {/* Queue List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {ambulances.map((ambulance, index) => (
            <button
              key={ambulance.id}
              onClick={() => onSelect(ambulance.id)}
              className={`w-full p-4 rounded-lg border transition-all ${
                selectedId === ambulance.id
                  ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                  : 'bg-card/50 border-border hover:bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                      ambulance.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : ambulance.status === 'idle'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {index + 1}
                    </div>
                    {ambulance.status === 'active' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{ambulance.id}</div>
                    <div className="text-xs text-muted">{ambulance.location}</div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  ambulance.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : ambulance.status === 'idle'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {ambulance.status}
                </span>
              </div>

              {ambulance.eta && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-primary">{ambulance.eta} min</span>
                  </div>
                  {ambulance.traffic && (
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      ambulance.traffic === 'low'
                        ? 'bg-green-500/20 text-green-400'
                        : ambulance.traffic === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {ambulance.traffic.toUpperCase()}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-border px-6 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-500/10 rounded-lg p-3">
            <div className="text-xs text-muted mb-1">Active</div>
            <div className="text-xl font-bold text-green-400">
              {ambulances.filter(a => a.status === 'active').length}
            </div>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-3">
            <div className="text-xs text-muted mb-1">Idle</div>
            <div className="text-xl font-bold text-blue-400">
              {ambulances.filter(a => a.status === 'idle').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
