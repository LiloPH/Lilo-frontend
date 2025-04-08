import React from "react";
import { ZoomIn, Map as LucideMap, Globe, Maximize2 } from "lucide-react";

interface MapControlProps {
  map: google.maps.Map;
  activeControls: {
    zoom: boolean;
    streetView: boolean;
    mapType: boolean;
    fullscreen: boolean;
  };
  setActiveControls: React.Dispatch<
    React.SetStateAction<{
      zoom: boolean;
      streetView: boolean;
      mapType: boolean;
      fullscreen: boolean;
    }>
  >;
}

const MapControl: React.FC<MapControlProps> = ({
  map,
  activeControls,
  setActiveControls,
}) => {
  const toggleControl = (control: keyof typeof activeControls) => {
    setActiveControls((prev) => ({
      ...prev,
      [control]: !prev[control],
    }));

    switch (control) {
      case "zoom":
        map.setOptions({ zoomControl: !activeControls.zoom });
        break;
      case "streetView":
        map.setOptions({ streetViewControl: !activeControls.streetView });
        break;
      case "mapType":
        map.setOptions({ mapTypeControl: !activeControls.mapType });
        break;
      case "fullscreen":
        map.setOptions({ fullscreenControl: !activeControls.fullscreen });
        break;
    }
  };

  return (
    <div className="absolute bottom-2 left-2 bg-yellow-50 rounded-lg shadow-md p-2 md:bottom-2 md:left-2">
      <div className="flex flex-col gap-3">
        {/* <button
          onClick={() => toggleControl("zoom")}
          className={`p-2 rounded-full ${
            activeControls.zoom
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          title="Zoom Controls"
        >
          <ZoomIn size={20} />
        </button> */}

        {/* <button
          onClick={() => toggleControl("streetView")}
          className={`p-2 rounded-full ${
            activeControls.streetView
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          title="Street View"
        >
          <Globe size={20} />
        </button> */}

        {/* <button
          onClick={() => toggleControl("mapType")}
          className={`p-2 rounded-full ${
            activeControls.mapType
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          title="Map Type"
        >
          <LucideMap size={20} />
        </button> */}

        {/* <button
          onClick={() => toggleControl("fullscreen")}
          className={`p-2 rounded-full ${
            activeControls.fullscreen
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          title="Fullscreen"
        >
          <Maximize2 size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default MapControl;
