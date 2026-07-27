import type { Route } from "./+types/project_details";
import { useLoaderData, Form, redirect, Link } from "react-router";
import type { Project } from "../models/project";
import TaskTable from "~/components/task_table";
import Header from "../components/header";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.project_id) {
    throw new Error("No id was specified!");
  }
  const endpoint = `http://backend:8000/project/${params.project_id}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Error fetching project no ${params.project_id}: ${response.status}`);
  }
  return await response.json();
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete") {
    const endpoint = `http://backend:8000/delete_project/${params.project_id}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting project ${params.project_id}`);
    }
    return redirect("/projects");
  } else if (intent == "delete-task") {
    const taskId = formData.get("task_id");
    const endpoint = `http://backend:8000/delete/${params.project_id}/${taskId}`;
    const response = await fetch(endpoint, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting task ${taskId}`);
    }
    return redirect(`/projects/${params.project_id}`);
  }
}

export default function ProjectDetails() {
  const project_details: Project = useLoaderData();
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                Project overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                {project_details.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                {project_details.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/projects/${project_details.id}/edit`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Edit project
              </Link>
              <Link
                to={`/projects/${project_details.id}/tasks/new`}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Add task
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Tasks</h2>
              <p className="mt-1 text-sm text-slate-600">
                Stay on top of every move from one elegant board.
              </p>
            </div>
            <Form method="post" className="flex items-center">
              <button
                type="submit"
                name="intent"
                value="delete"
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
              >
                Delete project
              </button>
            </Form>
          </div>
          <TaskTable tasks={project_details.tasks} projectId={Number(project_details.id)} />
        </section>
      </main>
    </div>
  );
}