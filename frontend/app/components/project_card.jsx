import  Project from "../models/project";

export default function ProjectCard({ project: Project }) {
    return (
        <div>
            <h2>{project.title}</h2>
        </div>
    );
}