import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border border-yellow-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-yellow-100">
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-gray-300" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-gray-300" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-gray-300" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-[100px] bg-gray-300" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px] bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px] bg-gray-300" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-[120px] bg-gray-300" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-10 w-24 bg-gray-300" />
        <Skeleton className="h-4 w-[100px] bg-gray-300" />
        <Skeleton className="h-10 w-24 bg-gray-300" />
      </div>
    </div>
  );
};

export default TableSkeleton;
