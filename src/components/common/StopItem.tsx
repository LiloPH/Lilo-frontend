import React from "react";
import { StopType } from "@/type";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "../ui/button";
import { Edit, MapPin, Trash } from "lucide-react";

interface StopItemType {
  stop: StopType;
  index: number;
}

const StopItem = ({ stop, index }: StopItemType) => {
  return (
    <Draggable draggableId="stop" index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="hover:bg-gray-50 marker:text-xs marker:text-gray-700 marker:font-bold flex flex-row justify-between items-center"
        >
          <div className="truncate max-w-9/12">{stop.name}</div>
          <div>
            <Button size="icon">
              <MapPin />
            </Button>
            <Button size="icon">
              <Trash />
            </Button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default StopItem;
