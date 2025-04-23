import { Button } from "../ui/button";
import { useRoute } from "@/store/useRouteStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import StopItem from "../common/StopItem";
import { Plus } from "lucide-react";

const StopControl = () => {
  const { selectedStop, addStop, selectedRouteInfo } = useRoute();

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <div className="absolute bottom-0 left-0 rounded-md bg-yellow-50 shadow-2xl p-4 w-full md:left-2 max-h-60 md:bottom-2 md:w-md overflow-hidden">
      <h1 className="line-clamp-1 text-center font-medium">
        {selectedRouteInfo?.waypoint?.name || "NO"}
      </h1>
      <div className="py-4 px-2 overflow-y-auto max-h-36">
        {selectedStop && selectedStop.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {selectedStop.map((stop, index) => (
              <StopItem
                stop={stop}
                index={index}
                type={selectedRouteInfo?.type || "inbound"}
                waypointIndex={selectedRouteInfo?.waypointIndex || 0}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center text-sm font-bold text-red-500">
            No stops available. Please add a stop.
          </div>
        )}
      </div>

      <Button
        className="w-full bg-yellow-200 hover:bg-yellow-500"
        onClick={() =>
          addStop(
            selectedRouteInfo?.type || "inbound",
            selectedRouteInfo?.waypointIndex || 0
          )
        }
      >
        <Plus />
        Add Stop
      </Button>
    </div>
  );
};

export default StopControl;
