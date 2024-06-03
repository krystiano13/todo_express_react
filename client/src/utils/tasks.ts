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

export function addTask(
  e: React.FormEvent<HTMLFormElement>,
  userContext: UserContext,
  tasks: { title: string; isDone: boolean }[],
  setTasks: (tasks: { title: string; isDone: boolean }[]) => void
) {
  e.preventDefault();

  if (!userContext.User.user) return;
  const formData = new FormData(e.target as HTMLFormElement);

  fetch(`http://localhost:3000/api/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      isDone: false,
    }),
  })
    .then((res) => {
      if (res.status === 500) {
        alert("Internal server error");
      }

      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data.task) {
        setTasks([...tasks, data.task]);
        //@ts-ignore
        e.target.children[0].value = "";
      }
    });
}
