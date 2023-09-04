import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/4 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className="relative dark:drop-shadow-[0_0_0.3rem_#fffff] dark:invert text-2xl font-bold">
          New Todo
        </h1>
      </div>
      <form
        action={createTodo}
        className=" flex flex-col gap-2 justify-between items-center mt-9"
      >
        <input
          type="text"
          name="title"
          className="border border-white bg-transparent rounded px-1 py-1 outline-none focus-within:border-sky-600"
        />
        <div className="flex gap-1 justify-center mt-2">
          <Link
            href=".."
            className="border border-white text-white px-2 py-1 rounded hover:bg-cyan-600 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-white text-white px-2 py-1 rounded hover:bg-cyan-600 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
