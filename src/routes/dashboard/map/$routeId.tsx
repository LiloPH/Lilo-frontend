import { createFileRoute } from "@tanstack/react-router";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";

const mapContainerStyle = {
  width: "100%",
  height: "100dvh",
  padding: "0",
};

const center = {
  lat: 10.7202,
  lng: 122.5621,
};

const bounds = {
  north: 10.7902,
  south: 10.6502,
  east: 122.6321,
  west: 122.4921,
};

export const Route = createFileRoute("/dashboard/map/$routeId")({
  component: MapComponent,
});

function MapComponent() {
  const { routeId } = Route.useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API as string,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    if (!map) return;

    const googleBounds = new window.google.maps.LatLngBounds();
    googleBounds.extend({ lat: bounds.north, lng: bounds.east });
    googleBounds.extend({ lat: bounds.south, lng: bounds.west });
    map.fitBounds(googleBounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    Swal.fire({
      title: "Route ID",
      text: `You are editing route: ${routeId}`,
      icon: "info",
      confirmButtonText: "OK",
    });
  }, [routeId]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full h-full p-0">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
          mapId: import.meta.env.VITE_MAP_ID,
        }}
      >
        {/* Map markers and other components will go here */}
      </GoogleMap>
    </div>
  );
}
