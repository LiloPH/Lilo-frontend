import React, { useRef } from "react";
import { LocationType, RouteType } from "@/type";
import { Autocomplete } from "@react-google-maps/api";
import { Button } from "../ui/button";
import { OctagonPause, MapPinCheckInside, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Draggable } from "@hello-pangea/dnd";
import { useRoute } from "@/store/useRouteStore";
import Swal from "sweetalert2";
import { showStore } from "@/store/showStore";
import clsx from "clsx";

interface MapInputTypeProp {
  waypoint: LocationType;
  index: number;
  type: RouteType;
}

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

const MapInput = ({ waypoint, index, type }: MapInputTypeProp) => {
  const color =
    type === "inbound" ? "green" : type === "outbound" ? "blue" : "gray";
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  const {
    deleteRoute,
    setSelectedStop,
    selectedRouteInfo,
    setWaypointData,
    setIsPlacing,
    isPlacing,
    setWaypointName,
  } = useRoute();
  const { toggleShowStopControl, showStopControl } = showStore();

  const handleDelete = async (type: RouteType, index: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteRoute(type, index);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  };

  const toggleSelectedStop = (
    type: RouteType,
    index: number,
    order: number
  ) => {
    toggleShowStopControl();

    setSelectedStop(type, index);
  };

  const handlePlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.name && place.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      if (addressInputRef.current) {
        addressInputRef.current.value = place.name;
      }

      setWaypointData(type, index, location, place.name);
    }
  };

  return (
    <Draggable
      draggableId={`${waypoint.routeNo}-${type}-${index}`}
      index={index}
    >
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`hover:bg-gray-50 marker:text-xs marker:text-${color}-700 marker:font-bold relative pl-5 py-1.5`}
        >
          <div className="flex gap-2">
            <Autocomplete
              className="w-full"
              onLoad={(autocomplete) => {
                autocomplete.addListener("place_changed", () => {
                  handlePlaceSelect(autocomplete);
                });
              }}
              options={{
                componentRestrictions: { country: "ph" },
                bounds: new google.maps.LatLngBounds(
                  new google.maps.LatLng(bounds.south, bounds.west),
                  new google.maps.LatLng(bounds.north, bounds.east)
                ),
              }}
            >
              <Input
                ref={addressInputRef}
                type="text"
                className="text-sm w-full border-gray-300"
                placeholder="search location address"
                value={waypoint.name || ""}
                onChange={(e) => {
                  setWaypointName(type, index, e.target.value);
                }}
              />
            </Autocomplete>
            <Button
              size="icon"
              onClick={() => {
                if (waypoint?.order !== null) {
                  toggleSelectedStop(type, index, waypoint.order);
                }
              }}
              className={clsx(
                "text-blue-700 hover:bg-blue-300 hover:text-black duration-200",
                showStopControl &&
                  selectedRouteInfo?.type === type &&
                  selectedRouteInfo?.waypointIndex === index &&
                  "bg-blue-300 text-black"
              )}
            >
              <OctagonPause />
            </Button>
            <Button
              size="icon"
              className={clsx(
                "text-green-700 hover:bg-green-300 hover:text-black duration-200",
                isPlacing?.waypointIndex === index &&
                  isPlacing?.placing &&
                  "hover:bg-green-300 text-black duration-200"
              )}
              onClick={() =>
                setIsPlacing({ waypointIndex: index, type, placing: true })
              }
            >
              <MapPinCheckInside />
            </Button>
            <Button
              size="icon"
              className="text-red-700 hover:bg-red-300 hover:text-black duration-200"
              onClick={() => handleDelete(type, index)}
            >
              <Trash2 />
            </Button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default React.memo(MapInput);
