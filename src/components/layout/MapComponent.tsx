"use client";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  onLocationSelect?: (province: string | null, regency: string | null) => void;
};

type GeocodeResult = {
  province: string | null;
  regency: string | null;
};

const reverseGeocode = async (lat: number, lon: number): Promise<GeocodeResult | null> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "YourAppName/1.0 (contact@example.com)",
    },
  });

  if (!response.ok) return null;

  const data = await response.json();
  const address = data.address || {};

  return {
    province: address.state || null,
    regency: address.county || address.city || address.town || null,
  };
};

const MapComponent: React.FC<Props> = ({ onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([-6.2, 106.8], 6); // Jakarta as default center

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker: L.Marker | null = null;

    map.on("click", async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      const result = await reverseGeocode(lat, lng);

      if (result && onLocationSelect) {
        onLocationSelect(result.province, result.regency);
      }

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }

      marker.bindPopup(`
        <b>Province:</b> ${result?.province || "N/A"}<br/>
        <b>Regency:</b> ${result?.regency || "N/A"}
      `).openPopup();
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;