import CreateProjectCard from "./create_project_card";
import { ProjectCard } from "./project_card";
import { type Project } from "../models/project";

export interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Workspace
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Your projects
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Organize notes, tasks, and progress in one calm, polished studio.
          </p>
        </div>
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          {projects.length} active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <CreateProjectCard />
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}