import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ptTasks = [
  {
    id: 1,
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    completed: false,
  },
  {
    id: 2,
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    completed: true,
  },
  {
    id: 3,
    title: "Tarefa 3",
    description: "Descrição da tarefa 3",
    completed: false,
  },
  {
    id: 4,
    title: "Tarefa 4",
    description: "Descrição da tarefa 4",
    completed: false,
  },
  {
    id: 5,
    title: "Tarefa 5",
    description: "Descrição da tarefa 5",
    completed: false,
  },
];

const enTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for task 2",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description for task 3",
    completed: false,
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description for task 4",
    completed: false,
  },
  {
    id: 5,
    title: "Task 5",
    description: "Description for task 5",
    completed: false,
  },
];

const getTasks = async (lng: string) => {
  await new Promise((r) => setTimeout(r, 2000));

  return lng === "pt" ? ptTasks : enTasks;
};

export async function TaskList({ lng }: { lng: string }) {
  const tasks = await getTasks(lng);

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <h2 className="font-semibold text-lg">{task.title}</h2>
          </CardHeader>
          <CardContent>
            <p>{task.description}</p>
          </CardContent>
          <CardFooter>
            <Button
              className={cn(
                task.completed ? "bg-green-700" : "bg-destructive",
                "font-bold"
              )}
            >
              {task.completed ? "Completed" : "Incomplete"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
