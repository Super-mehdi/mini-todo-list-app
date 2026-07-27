import { useLoaderData } from "react-router";
import type { Project } from "../models/project";
import ProjectGrid from "../components/project_grid";
import Header from "../components/header";

export async function loader() {
  const endpoint = "http://backend:8000/all_projects";
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch projects : ${response.status}`);
  }
  const data: Project[] = await response.json();
  return data;
}

export default function Projects() {
  const fetchedProjects: Project[] = useLoaderData();
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ProjectGrid projects={fetchedProjects} />
      </main>
    </div>
  );
}