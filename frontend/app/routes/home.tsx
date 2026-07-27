import type { Route } from "./+types/home";
import { Link } from "react-router";
import Header from "../components/header";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Notebookly" }];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl rounded-[40px] border border-white/70 bg-white/75 p-8 shadow-[0_40px_90px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:p-12 lg:p-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            Calm workspace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Turn scattered work into something beautifully clear.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Notebookly helps you organize projects, tasks, and progress in a space that feels as thoughtful as your ideas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Explore projects
            </Link>
            <Link
              to="/projects/new"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Start a project
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
