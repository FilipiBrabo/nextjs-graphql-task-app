import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export async function TaskListSkeleton() {
  const tasksAmount = Array.from({ length: 3 });
  return (
    <div className="flex flex-col gap-4">
      {tasksAmount.map((_, index) => (
        <Skeleton key={index} className="h-40 w-full" />
        // <Card key={task.id} className="mb-4">
        //   <CardHeader>
        //     <h2 className="font-semibold text-lg">{task.title}</h2>
        //   </CardHeader>
        //   <CardContent>
        //     <p>{task.description}</p>
        //   </CardContent>
        //   <CardFooter>
        //     <Button className={task.completed ? "bg-green-500" : "bg-red-500"}>
        //       {task.completed ? "Completed" : "Incomplete"}
        //     </Button>
        //   </CardFooter>
        // </Card>
      ))}
    </div>
  );
}
