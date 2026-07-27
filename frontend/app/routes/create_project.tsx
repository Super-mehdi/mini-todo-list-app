import { Form, redirect, Link } from "react-router";
import type { Route } from "./+types/create_project";
import Header from "../components/header";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const endpoint = "http://backend:8000/projects";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to create project : ${response.status}`);
  }
  return redirect("/projects");
}

export default function CreateProject() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="mx-auto flex max-w-3xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="w-full rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
              New project
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Create a fresh workspace
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Give your project a clear title and a concise description so the rest of the workspace feels effortless.
            </p>
          </div>
          <Form method="post" className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Project title"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Create project
              </button>
              <Link
                to="/projects"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </Form>
        </div>
      </main>
    </div>
  );
}