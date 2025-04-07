/* eslint-disable @typescript-eslint/no-unused-vars */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import Swal from "sweetalert2";
import { Skeleton } from "@/components/ui/skeleton";

const mapContainerStyle = {
  width: "100%",
  height: "90.5dvh",
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

export const Route = createFileRoute("/_authentication/dashboard/tour-map/$tourId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeControls, setActiveControls] = useState({
    zoom: false,
    streetView: false,
    mapType: false,
    fullscreen: false,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API as string,
    libraries: ["places"],
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

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <Skeleton className="w-full h-full rounded-md bg-gray-300" />
      </div>
    );
  }

  if (loadError) {
    Swal.fire({
      title: "Error",
      text: "Failed to load Google Maps",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      navigate({ to: "/dashboard/routes" });
    });
    return <div>Error loading maps</div>;
  }

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          mapId: import.meta.env.VITE_MAP_ID,
        }}
      >
        {/* Map markers and other components will go here */}
      </GoogleMap>
    </div>
  );
}
