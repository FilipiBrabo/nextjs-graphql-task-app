import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-6 w-[500px]" />
    </div>
  );
}
