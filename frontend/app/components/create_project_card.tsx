import { Link } from "react-router";

export default function CreateProjectCard() {
  return (
    <Link to={"/projects/new"} className="group">
      <div className="flex h-56 items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 via-white to-sky-50/80 p-6 text-center shadow-[0_20px_45px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_30px_70px_-35px_rgba(14,116,144,0.45)]">
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-semibold text-white transition group-hover:scale-105">
            +
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Create project</h2>
            <p className="mt-1 text-sm text-slate-600">
              Start a new notebook for your next big idea.
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}