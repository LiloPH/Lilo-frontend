import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";

interface RouteLog {
  changedBy: string | null;
  message: string | null;
  time: string | null;
}

interface Route {
  _id: string;
  routeNo: number | string;
  routeName: string;
  routeColor: string;
  status: "completed" | "empty" | string;
  lastChange: RouteLog;
}

const RoutesColumns = (): ColumnDef<Route>[] => {
  const navigate = useNavigate();

  return [
    {
      accessorKey: "routeNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="RouteNo" />
      ),
    },
    {
      accessorKey: "routeName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Route Name" />
      ),
    },
    {
      accessorKey: "routeColor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Route Color" />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const route = row.original;
        return (
          <div className="flex gap-1">
            <Button
              title="edit"
              onClick={() => navigate({ to: `/dashboard/map/${route._id}` })}
            >
              Edit
            </Button>
            <Button
              className="bg-red-300 text-white"
              title="delete"
              onClick={() => navigate({ to: `/dashboard/map/${route._id}` })}
            >
              Delete
            </Button>
            <Button
              title="Waypoints"
              className="bg-green-500 text-white"
              onClick={() => navigate({ to: `/dashboard/map/${route._id}` })}
            >
              Add Waypoints
            </Button>
          </div>
        );
      },
    },
  ];
};

export default RoutesColumns;
