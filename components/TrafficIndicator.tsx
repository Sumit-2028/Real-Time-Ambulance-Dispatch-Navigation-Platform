'use client';

interface TrafficIndicatorProps {
  level: 'low' | 'medium' | 'high';
  location?: string;
}

export default function TrafficIndicator({ level, location }: TrafficIndicatorProps) {
  const getColor = () => {
    switch (level) {
      case 'low':
        return 'text-green-400 bg-green-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'high':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getColor()}`}>
      <div className={`w-2 h-2 rounded-full ${
        level === 'low' ? 'bg-green-400' : level === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
      }`}></div>
      <span className="text-xs font-semibold">{level.toUpperCase()}</span>
      {location && <span className="text-xs text-gray-400">{location}</span>}
    </div>
  );
}
