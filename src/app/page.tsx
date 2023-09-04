import Link from "next/link";
import { prisma } from "../db";
import { TodoItem } from "../components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 mb-4">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#fffff] dark:invert text-2xl font-bold">
          Todos
        </h1>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}{" "}
      </ul>

      <div className="mb-32 text-center">
        {" "}
        <Link
          href="/new"
          className="flex flex-col border border-white text-white px-2 py-1 rounded hover:bg-cyan-600 outline-none"
        >
          New Todo
        </Link>
      </div>
    </main>
  );
}
