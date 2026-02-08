export const graphNodes = [
  { id: 0, lat: 12.9716, lng: 77.5946 }, // Bengaluru center
  { id: 1, lat: 12.975, lng: 77.6 },
  { id: 2, lat: 12.969, lng: 77.59 },
  { id: 3, lat: 12.98, lng: 77.605 },
  { id: 4, lat: 12.965, lng: 77.61 },
  { id: 5, lat: 12.985, lng: 77.62 }, // Hospital
];

// helper: distance between two coordinates
function distance(a, b) {
  const dx = a.lat - b.lat;
  const dy = a.lng - b.lng;
  return Math.sqrt(dx * dx + dy * dy);
}

// 🔥 MAIN FUNCTION
export function findNearestNode(latlng) {
  let nearest = graphNodes[0];
  let minDist = distance(latlng, nearest);

  for (let node of graphNodes) {
    const d = distance(latlng, node);
    if (d < minDist) {
      minDist = d;
      nearest = node;
    }
  }
  return nearest.id;
}

// existing helper
export function mapNodesToCoords(nodes) {
  return nodes.map((id) => [graphNodes[id].lat, graphNodes[id].lng]);
}
