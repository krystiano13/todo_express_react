import type { UserContext } from "../types/user";

export function getTasks(
  userContext: UserContext,
  setTasks: (tasks: { title: string; isDone: boolean }[]) => void
) {
    
  if (!userContext.User.user) return;

  fetch(
    `http://localhost:3000/api/tasks?email=${userContext.User.user.email}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.tasks) {
        const tasksArray: { title: string; isDone: boolean }[] = [];
        data.tasks.forEach((item: { title: string; isDone: boolean }) => {
          tasksArray.push({
            title: item.title,
            isDone: item.isDone,
          });
        });

        setTasks(tasksArray);
      }
    });
}
