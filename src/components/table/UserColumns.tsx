/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { PromoteDialog } from "@/components/common/PromoteDialog";

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

interface UserColumnsProps {
  users: User[];
}

export function UserColumns({ users }: UserColumnsProps): ColumnDef<User>[] {
  return [
    {
      accessorKey: "picture",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Picture" />
      ),
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage
            src={row.original.picture}
            alt={row.original.name}
            className="rounded-full size-10"
          />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "Action",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Action" />;
      },
      cell: ({ row }) => {
        const user = row.original;
        return <PromoteDialog user={user} />;
      },
    },
  ];
}
