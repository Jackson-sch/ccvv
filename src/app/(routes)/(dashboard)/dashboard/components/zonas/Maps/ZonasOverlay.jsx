import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export default function ZonasOverlay({ zonas }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const polygons = zonas.map((zona) => {
      const paths = zona.coordinates.map(
        (coord) => new google.maps.LatLng(coord[0], coord[1])
      );
      const polygon = new google.maps.Polygon({
        paths,
        map,
        fillColor: zona.color,
        fillOpacity: 0.7,
        strokeWeight: 1,
        clickable: true,
        editable: false,
      });

      // Create InfoWindow for each polygon
      const bounds = new google.maps.LatLngBounds();
      paths.forEach((path) => bounds.extend(path));
      const infoWindow = new google.maps.InfoWindow({
        content: createInfoWindowContent(zona),
        position: bounds.getCenter(),
      });

      // Calculate the center of the polygon
      const center = new google.maps.LatLngBounds();
      paths.forEach((path) => center.extend(path));
      const centerPoint = center.getCenter();

      // CreateMarker with a label
      new google.maps.Marker({
        position: centerPoint,
        map,
        label: {
          text: zona.name,
          color: "#333",
          fontSize: "12px",
          fontWeight: "bold",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0,
        },
      });

      // Show InfoWindow on click
      google.maps.event.addListener(polygon, "click", () => {
        infoWindow.open(map);
      });

      //Open InfoWindow initially
      infoWindow.open(!map);

      return polygon;
    });

    return () => {
      polygons.forEach((polygon) => polygon.setMap(null));
    };
  }, [map, zonas]);
  return null;
}

const createInfoWindowContent = (zona) => {
  return `
    <div>
      <h1 class="text-slate-950 text-lg font-bold">${zona.name}</h1>
    </div>
  `;
};
