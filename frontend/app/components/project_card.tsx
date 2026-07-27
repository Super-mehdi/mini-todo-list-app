import type { Project } from "../models/project";
import { Link } from "react-router";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.id}`} className="group">
      <div className="relative h-56 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)]">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-sky-400/20 via-indigo-400/20 to-emerald-400/20" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
              Project
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              {project.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-6 text-slate-600">
              {project.description ?? "A beautifully organized workspace for your ideas."}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">Open notebook</span>
            <span className="font-medium text-slate-700 transition group-hover:text-slate-950">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}