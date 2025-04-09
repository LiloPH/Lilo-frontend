import { Button } from "../ui/button";
import { useRoute } from "@/store/useRouteStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import StopItem from "../common/StopItem";
import { Plus } from "lucide-react";

const StopControl = () => {
  const { selectedStop, addStop, selectedRouteInfo } = useRoute();

  return (
    <div className="absolute bottom-0 left-0 rounded-md bg-yellow-50 shadow-2xl py-4 px-4 w-full md:left-2 max-h-60 md:bottom-2 md:w-md overflow-hidden">
      <h1 className="line-clamp-1 text-center font-medium">
        {selectedRouteInfo?.waypoint?.name}
      </h1>

      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="stops">
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="overflow-y-auto max-h-40 px-2"
            >
              {selectedStop && selectedStop.length > 0 ? (
                selectedStop.map((stop, index) => (
                  <StopItem key={index} stop={stop} index={index} />
                ))
              ) : (
                <li className="text-center text-red-500 py-2">
                  No stops selected yet.
                </li>
              )}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        className="w-full bg-yellow-200 hover:bg-yellow-500"
        onClick={() =>
          selectedRouteInfo?.type &&
          addStop(selectedRouteInfo.type, selectedRouteInfo.waypointIndex)
        }
        disabled={!selectedRouteInfo?.type}
      >
        <Plus />
        Add Stop
      </Button>
    </div>
  );
};

export default StopControl;
