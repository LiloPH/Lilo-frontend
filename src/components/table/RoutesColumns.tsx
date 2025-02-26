/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";
import UpdateRoute from "../modal/UpdateRoute";
import { Badge } from "../ui/badge";
import Swal from "sweetalert2";

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

  const handleDelete = async (_id: string, routeNo: string) => {
    const choice = await Swal.fire({
      title: `Are you sure you want to delete route number ${routeNo}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (choice.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  };

  return [
    {
      accessorKey: "routeNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Route Number" />
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
      cell: ({ row }) => {
        const route = row.original;
        return (
          <input
            type="color"
            name="color"
            id="color"
            defaultValue={route.routeColor}
            disabled
          />
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const route = row.original;
        const getStatusClass = (status: string) => {
          switch (status) {
            case "verified":
              return "bg-blue-200";
            case "completed":
              return "bg-green-200";
            case "empty":
              return "bg-yellow-200";
            default:
              return "bg-transparent";
          }
        };

        return (
          <Badge variant={"default"} className={getStatusClass(route.status)}>
            {route.status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      enableSorting: false,
      cell: ({ row }) => {
        const route = row.original;
        return (
          <div className="flex gap-2">
            <UpdateRoute
              routeNo={Number(route.routeNo)}
              routeName={route.routeName}
              routeColor={route.routeColor}
              _id={route._id}
            />
            <Button
              className="bg-red-300 text-white hover:text-black"
              title="delete"
              onClick={() => handleDelete(route._id, String(route.routeNo))}
            >
              Delete
            </Button>
            <Button
              title="Waypoints"
              className="bg-green-500 text-white hover:text-black "
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
