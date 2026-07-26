import type {Route} from "./+types/project_details"
import { useLoaderData, Form, redirect, Link } from "react-router";
import type {Project}  from "../models/project";


export async function loader({params}: Route.LoaderArgs){
    if (! params.project_id) {
        throw new Error("No id was specified!");
    }
    const endpoint = `http://backend:8000/project/${params.project_id}`;
    const response= await fetch(endpoint);
    if (!response.ok){
        throw new Error(`Error fetching project no ${params.project_id}: ${response.status}`)
    }
    return await response.json();
}

export async function action({request, params}:Route.ActionArgs){
    const formData= await request.formData();
    const intent = formData.get("intent");
    console.log(intent);
    console.log(params.project_id);
    const endpoint = `http://backend:8000/delete_project/${params.project_id}`
    const response=await fetch(endpoint,{
        method:"DELETE"
    });
    if (!response.ok){
        throw new Error(`Error deleting project ${params.project_id}`);
    }
    return redirect("/projects");
}

export default function ProjectDetails(){
    const project_details:Project = useLoaderData();
    return (
        <div>
        <h1>Title : {project_details.title}</h1>
        <p>Description : {project_details.description}</p>
        
        <ul>
            {
            project_details.tasks.map(
                (task)=>{return <li key={task.id}>{task.title} : {task.description} : {task.status}</li>}
            )
            }
        </ul>
        <Form method="post" className="flex flex-col">
            <button 
            type="submit"
            name="intent"
            value="delete"
            >
                Delete project
            </button>
            <Link to={`/projects/${project_details.id}/edit`}>
            <button 
            type="submit"
            name="intent"
            value="update"
            >
                Edit project
            </button>
            </Link>
        </Form>
        </div>
    );
}