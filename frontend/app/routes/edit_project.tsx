import type {Route} from "./+types/edit_project";
import { useLoaderData, Form, redirect } from "react-router";
import type { Project } from "~/models/project";


export async function loader({params}:Route.LoaderArgs){
    const endpoint = `http://backend:8000/project/${params.project_id}`;
    const response = await fetch(endpoint);
    if (!response.ok){
        throw new Error(`Error fetching project ${params.project_id}`);
    }
    const data:Project=await response.json();
    console.log(data);
    return data;
}

export async function action({params,request}:Route.ActionArgs){
    const endpoint = `http://backend:8000/update_project/${params.project_id}`;
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const response = await fetch(endpoint,{
        method: "PUT",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    });
    if (!response.ok){
        throw new Error(`Error modifying project ${params.project_id}`);
    }
    return redirect(`/projects/${params.project_id}`);
}


export default function EditProject(){
    const fetched_project: Project = useLoaderData();
    return (
        <Form method="post">
            <input name="title" defaultValue={fetched_project.title}></input>
            <textarea name="description" defaultValue={fetched_project.description}></textarea>
            <button type="submit">
                Edit
            </button>
        </Form>
    );
}