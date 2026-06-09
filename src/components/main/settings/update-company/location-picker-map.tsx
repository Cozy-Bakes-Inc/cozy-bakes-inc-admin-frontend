"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pinIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#b45309" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

function MapClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(
        parseFloat(e.latlng.lat.toFixed(6)),
        parseFloat(e.latlng.lng.toFixed(6)),
      );
    },
  });
  return null;
}

function FlyToLocation({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

export interface LocationPickerMapProps {
  lat: number;
  lng: number;
  flyToCenter: [number, number] | null;
  onChange: (lat: number, lng: number) => void;
}

export function LocationPickerMap({ lat, lng, flyToCenter, onChange }: LocationPickerMapProps) {
  const [mounted, setMounted] = useState(false);
  const hasPosition = lat !== 0 || lng !== 0;
  const center: [number, number] = hasPosition ? [lat, lng] : [6.5244, 3.3792];
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (markerRef.current && hasPosition) {
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng, hasPosition]);

  if (!mounted) return null;

  return (
    <MapContainer
      center={center}
      zoom={hasPosition ? 14 : 11}
      style={{ height: "280px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onChange={onChange} />
      <FlyToLocation center={flyToCenter} />
      {hasPosition && (
        <Marker
          ref={markerRef}
          position={[lat, lng]}
          icon={pinIcon}
          draggable
          eventHandlers={{
            dragend(e) {
              const pos = (e.target as L.Marker).getLatLng();
              onChange(
                parseFloat(pos.lat.toFixed(6)),
                parseFloat(pos.lng.toFixed(6)),
              );
            },
          }}
        />
      )}
    </MapContainer>
  );
}
