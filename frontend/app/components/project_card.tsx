import type { Project } from "../models/project";
import { Link } from "react-router";

export function ProjectCard({ project }: { project: Project }) {
    return (
        <Link to={`/projects/${project.id}`}>
        <div className="rounded-lg h-56 bg-[#D2E3FC] flex items-center justify-center">
            <h2>{project.title}</h2>
        </div>
        </Link>
    );
}