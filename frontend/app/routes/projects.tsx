import { useLoaderData } from "react-router";
import type {Project} from "../models/project"
import ProjectGrid from "../components/project_grid";

export async function loader() {
    const endpoint="http://backend:8000/all_projects";
    const response = await fetch(endpoint);
    if (!response.ok){
        throw new Error(`Failed to fetch projects : ${response.status}`)
    }
    const data:Project[] = await response.json();
    return data;
}

export default function Projects() {
    const fetchedProjects: Project[] = useLoaderData();
    return (
        <ProjectGrid projects={fetchedProjects} />
    );
}