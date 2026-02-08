import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function MapView({ route, traffic, onSelect }) {

   const getColor = () => {
     if (traffic === "LOW") return "green";
     if (traffic === "MEDIUM") return "orange";
     if (traffic === "HIGH") return "red";
     return "blue"; // fallback
   };

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={13}
      style={{ height: "90vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onSelect={onSelect} />

      {route.length > 0 && (
        <Polyline
          positions={route}
          pathOptions={{ color: getColor(), weight: 6 }}
        />
      )}
    </MapContainer>
  );

}
