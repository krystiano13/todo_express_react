import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export function Home() {
  const userContext = useContext(UserContext);
  const [tasks, setTasks] = useState<{ title: string; isDone: boolean }[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Your Tasks</h1>
      <section className="p-2 flex flex-col justify-between mt-16 bg-white section-shadow min-w-[20rem] md:min-w-[25rem] min-h-[25rem] md:min-h-[30rem]">
        <form className="p-2 flex justify-between items-center">
          <input
            className="input-shadow w-[79%] outline-0 p-1"
            type="text"
            placeholder="Your Task"
            required
          />
          <button
            className="w-[19%] bg-emerald-500 hover:bg-emerald-400 transition-colors p-1 text-white"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="p-2 flex flex-col items-center justify-start gap-1 overflow-y-auto min-h-[80%] max-h-[80%]">
          {tasks.map((item) => (
            <div className="task bg-slate-50 w-full flex items-center justify-between form-shadow p-3">
              <p
                className={`overflow-x-auto text-sm ${
                  item.isDone ? "line-through" : ""
                }`}
              >
                {item.title}
              </p>
              <section className="flex items-center gap-3">
                <button className="text-sm p-1 pl-4 pr-4 text-white bg-emerald-500 hover:bg-emerald-400 transition">
                  Done
                </button>
                <button className="text-sm p-1 pl-4 pr-4 text-white bg-red-500 hover:bg-red-400 transition">
                  Delete
                </button>
              </section>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
