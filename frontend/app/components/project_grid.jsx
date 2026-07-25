import CreateProjectCard from "./create_project_card";
import ProjectCard from "./project_card";

export default function ProjectGrid({ projects }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <CreateProjectCard/>
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project}/>
            ))}
        </div>
    );
}