import { Skeleton } from "@/components/ui/skeleton";
import { TaskListSkeleton } from "./_components/TaskList.skeleton";

export default function Loading() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-6 lg:h-10 w-[500px]" />
    </div>
  );
}
