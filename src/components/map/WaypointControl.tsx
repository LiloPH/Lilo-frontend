/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  Save,
  Trash2,
  ChevronsUpDown,
  Shrink,
  Expand,
  Plus,
  MapPinPlus,
  MapPinCheckInside,
  OctagonPause,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRoute } from "@/store/useRouteStore";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import MapInput from "../common/MapInput";

const WaypointInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<"inbound" | "outbound" | null>(
    null
  );
  const { inbound, outbound, name, reOrderRoutes, addRoutes } = useRoute();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const type = source.droppableId as "inbound" | "outbound";

    reOrderRoutes(type, source.index, destination.index);
  };

  const handleAddRoutes = (type: "inbound" | "outbound") => {
    addRoutes(type);
    setOpenSection(type);
  };

  const handleSave = async () => {
    if (!inbound || !outbound) return;

    const combinedRoutes = [...outbound, ...inbound];

    const combinedWithOrder = combinedRoutes.map((route, index) => ({
      ...route,
      order: index,
    }));

    console.log("Combined waypoints:", combinedWithOrder);
  };

  return (
    <div className="absolute top-0 left-0 bg-white w-full md:left-2 md:top-2 md:w-md  overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-2 items-center px-4 py-3 w-full justify-between border-b border-gray-100">
            <Link
              to="/dashboard/routes"
              className="hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Link>

            <h3 className="text-sm font-medium line-clamp-1 lg:text-base flex-1">
              {name}
            </h3>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSave}
              className="bg-green-100 hover:bg-green-200 text-green-700 border border-green-300"
            >
              <Save className="h-4 w-4 mr-1" />
              <span className="text-xs">Save</span>
            </Button>

            <CollapsibleTrigger className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              {isOpen ? (
                <Shrink className="h-5 w-5 text-gray-600" />
              ) : (
                <Expand className="h-5 w-5 text-gray-600" />
              )}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="max-h-[70vh] overflow-y-auto custom-scrollbar">
            <Collapsible
              open={openSection === "outbound"}
              onOpenChange={(open) => setOpenSection(open ? "outbound" : null)}
              className="px-3 pb-2 pt-2"
            >
              <CollapsibleTrigger className="flex justify-between w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 transition-colors rounded-md">
                <span className="font-medium text-blue-700 text-sm">
                  Outbound Waypoint
                </span>{" "}
                <ChevronsUpDown className="h-4 w-4 text-blue-700" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-2 max-h-48 overflow-y-auto custom-scrollbar mt-2 pb-1">
                <Droppable droppableId="outbound">
                  {(droppableProvider, snapshot) => (
                    <ul
                      className="space-y-1 list-[upper-alpha] pl-5"
                      ref={droppableProvider.innerRef}
                      {...droppableProvider.droppableProps}
                    >
                      {outbound?.length ? (
                        outbound.map((waypoint, index) => (
                          <MapInput
                            key={`${waypoint.routeNo}-${index}`}
                            waypoint={waypoint}
                            index={index}
                            type="outbound"
                          />
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-2 text-sm">
                          No outbound waypoints
                        </p>
                      )}
                      {droppableProvider.placeholder}
                    </ul>
                  )}
                </Droppable>
              </CollapsibleContent>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                onClick={() => handleAddRoutes("outbound")}
              >
                <MapPinPlus className="h-4 w-4 mr-1" />
                <span className="text-xs">Add Outbound</span>
              </Button>
            </Collapsible>

            <Collapsible
              open={openSection === "inbound"}
              onOpenChange={(open) => setOpenSection(open ? "inbound" : null)}
              className="px-3 pb-3"
            >
              <CollapsibleTrigger className="flex justify-between w-full py-2 px-3 bg-green-50 hover:bg-green-100 transition-colors rounded-md">
                <span className="font-medium text-green-700 text-sm">
                  Inbound Waypoint
                </span>{" "}
                <ChevronsUpDown className="h-4 w-4 text-green-700" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-2 max-h-48 overflow-y-auto custom-scrollbar mt-2 pb-1">
                <Droppable droppableId="inbound">
                  {(droppableProvider, snapshot) => (
                    <ul
                      className="space-y-1 list-[upper-alpha] pl-5"
                      ref={droppableProvider.innerRef}
                      {...droppableProvider.droppableProps}
                    >
                      {inbound?.length ? (
                        inbound.map((waypoint, index) => (
                          <MapInput
                            waypoint={waypoint}
                            index={index}
                            type="inbound"
                            key={`${waypoint.routeNo}-${index}`}
                          />
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-2 text-sm">
                          No inbound waypoints
                        </p>
                      )}
                      {droppableProvider.placeholder}
                    </ul>
                  )}
                </Droppable>
              </CollapsibleContent>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                onClick={() => handleAddRoutes("inbound")}
              >
                <MapPinPlus className="h-4 w-4 mr-1" />
                <span className="text-xs">Add Inbound</span>
              </Button>
            </Collapsible>
          </CollapsibleContent>
        </DragDropContext>
      </Collapsible>
    </div>
  );
};

export default WaypointInput;
