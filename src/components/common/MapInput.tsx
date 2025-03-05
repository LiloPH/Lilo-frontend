import React from "react";
import { LocationType, RouteType } from "@/type";
import { Autocomplete } from "@react-google-maps/api";
import { Button } from "../ui/button";
import { OctagonPause, MapPinCheckInside, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Draggable } from "@hello-pangea/dnd";
import { useRoute } from "@/store/useRouteStore";
import Swal from "sweetalert2";

interface MapInputTypeProp {
  waypoint: LocationType;
  index: number;
  type: RouteType;
}

const MapInput = ({ waypoint, index, type }: MapInputTypeProp) => {
  const color =
    type === "inbound" ? "green" : type === "outbound" ? "blue" : "gray";

  const { deleteRoute } = useRoute();

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
            <Autocomplete className="w-full">
              <Input
                type="text"
                className="text-sm w-full border-gray-300"
                placeholder="search location name"
                value={waypoint.name}
              />
            </Autocomplete>
            <Button
              size="icon"
              className="text-blue-700 hover:bg-blue-300 hover:text-black duration-200"
            >
              <OctagonPause />
            </Button>
            <Button
              size="icon"
              className="text-green-700 hover:bg-green-300 hover:text-black duration-200"
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
