import { useEffect, useState } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import { connectWebSocket } from "./services/websocket";
import { findNearestNode, mapNodesToCoords } from "./services/nodeMapper";



function App() {
  const [clicks, setClicks] = useState([]); // selected node IDs
  const [route, setRoute] = useState([]); // lat/lng route
  const [eta, setEta] = useState(null); // ETA in minutes
  const [traffic, setTraffic] = useState(null);
  const [ambulanceId, setAmbulanceId] = useState(null);
 


  // 🔌 WebSocket connection (route + ETA)
  useEffect(() => {
    connectWebSocket((data) => {
      if (!data || !data.path) return;

      setRoute(mapNodesToCoords(data.path));
      setEta(data.eta);
      setTraffic(data.traffic);
    });
  }, []);

  // 🗺️ Handle map clicks
  const handleSelect = (latlng) => {
    if (clicks.length >= 2) return;

    const nearestNode = findNearestNode(latlng);
    const updated = [...clicks, nearestNode];
    setClicks(updated);

    // send to backend only if source ≠ destination
    if (updated.length === 2 && updated[0] !== updated[1]) {
      axios.post("http://localhost:8080/api/start", {
        source: updated[0],
        destination: updated[1],
      });
    }
  };

  // 🔄 Reset selection
  const resetSelection = () => {
    setClicks([]);
    setRoute([]);
    setEta(null);
    setTraffic(null);
  };


  return (
    <>
      <h2 style={{ textAlign: "center" }}>🚑 Select Source then Hospital</h2>

      {/* ETA + Status Panel */}
      {eta !== null && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#111827",
            color: "white",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "6px",
          }}
        >
          <div>🚑 Ambulance #{ambulanceId}</div>
          <div>⏱ ETA: {eta} min</div>
          <div>🚦 Traffic: {traffic}</div>
        </div>
      )}

      {/* Reset Button */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={resetSelection}>Reset Selection</button>
      </div>

      {/* Map */}
      <MapView route={route} traffic={traffic} onSelect={handleSelect} />
    </>
  );
}

export default App;
