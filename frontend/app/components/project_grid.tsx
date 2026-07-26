import CreateProjectCard from "./create_project_card";
import {ProjectCard} from "./project_card";
import {type Project} from "../models/project";

export interface ProjectGridProps{
    projects: Project[];
}


export default function ProjectGrid({ projects } : ProjectGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4 p-20 bg-[#F1F3F4] text-2xl text-[#202124]  ">
            <CreateProjectCard/>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project}/>
            ))}
        </div>
    );
}