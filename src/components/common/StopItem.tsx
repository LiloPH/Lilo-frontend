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
          <div className="truncate max-w-9/12 line-clamp-1">{stop.name}</div>
          <div>
            <Button
              size="icon"
              className="bg-blue-500 text-white hover:bg-blue-600 shadow-md rounded-full transition-colors duration-200"
            >
              <MapPin className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              className="bg-red-500 text-white hover:bg-red-600 shadow-md rounded-full transition-colors duration-200 ml-2"
            >
              <Trash className="w-5 h-5" />
            </Button>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default StopItem;
