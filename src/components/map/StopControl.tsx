import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRoute } from "@/store/useRouteStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import StopItem from "../common/StopItem";
import { Plus } from "lucide-react";

const StopControl = () => {
  const { selectedStop, addStop, selectedRouteInfo } = useRoute();

  return (
    <div className="absolute bottom-0 left-0 bg-white shadow-2xl py-4 px-2 w-full md:left-2 max-h-60 md:bottom-2 md:w-md overflow-hidden">
      <h1>{selectedRouteInfo?.waypoint?.name}</h1>

      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="stops">
          {(droppableProvider, snapshot) => (
            <ul
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
              className="overflow-y-auto max-h-40 px-2"
            >
              {selectedStop?.map((stop, index) => (
                <StopItem stop={stop} index={index} key={index} />
              ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        className="w-full"
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
