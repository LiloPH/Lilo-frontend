import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRoute } from "@/store/useRouteStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

const StopControl = () => {
  const { selectedStop, addStop, selectedRouteInfo } = useRoute();

  return (
    <div className="absolute bottom-0 left-0 bg-red-400 w-full md:left-2 md:bottom-2 md:w-md overflow-hidden">
      <h1>Test</h1>
      <pre>{JSON.stringify(selectedStop, null, 2)}</pre>

      <Button
        onClick={() =>
          selectedRouteInfo?.type &&
          addStop(selectedRouteInfo.type, selectedRouteInfo.waypointIndex)
        }
        disabled={!selectedRouteInfo?.type}
      >
        Add Stop
      </Button>
    </div>
  );
};

export default StopControl;
