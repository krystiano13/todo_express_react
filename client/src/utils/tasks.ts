import type { UserContext } from "../types/user";

export function getTasks(
  userContext: UserContext,
  setTasks: (tasks: { _id: string; title: string; isDone: boolean }[]) => void
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
      console.log(data);
      if (data.tasks) {
        const tasksArray: { _id: string; title: string; isDone: boolean }[] =
          [];
        data.tasks.forEach(
          (item: { _id: string; title: string; isDone: boolean }) => {
            tasksArray.push({
              _id: item._id,
              title: item.title,
              isDone: item.isDone,
            });
          }
        );

        setTasks(tasksArray);
      }
    });
}

export function addTask(
  e: React.FormEvent<HTMLFormElement>,
  userContext: UserContext,
  tasks: { _id: string; title: string; isDone: boolean }[],
  setTasks: (tasks: { _id: string; title: string; isDone: boolean }[]) => void
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

export function deleteTask(
  id: string,
  userContext: UserContext,
  tasks: { _id: string; title: string; isDone: boolean }[],
  setTasks: (tasks: { _id: string; title: string; isDone: boolean }[]) => void
) {
  if (!userContext.User.user) return;
  fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 500) {
      alert("Internal server error");
    } else if (res.status === 400) {
      alert("Task not found");
    }

    if (res.status === 201) {
      const newTasks = tasks.filter((item) => item._id !== id);
      setTasks(newTasks);
    }
  });
}

export function finishTask(
  id: string,
  userContext: UserContext,
  tasks: { _id: string; title: string; isDone: boolean }[],
  setTasks: (tasks: { _id: string; title: string; isDone: boolean }[]) => void,
  title: string
) {
  if (!userContext.User.user) return;
  fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      isDone: true,
    }),
  }).then((res) => {
    if (res.status === 201) {
      getTasks(userContext, setTasks);
    } else {
      alert("Internal server error");
    }
  });
}
