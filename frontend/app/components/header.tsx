import { Link } from "react-router";

export default function Header() {
  return (
    <header className="border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 text-sm font-semibold text-white shadow-lg shadow-sky-500/20">
            N
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              Notebookly
            </p>
            <p className="text-sm text-slate-500">Thoughtful project workspace</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-2 py-2 text-sm text-slate-600 sm:flex">
          <Link
            to="/projects"
            className="rounded-full px-4 py-2 transition hover:bg-white hover:text-slate-900"
          >
            Projects
          </Link>
          <Link
            to="/projects/new"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
          >
            New project
          </Link>
        </nav>
      </div>
    </header>
  );
}