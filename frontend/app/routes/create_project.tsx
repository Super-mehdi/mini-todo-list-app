import {Form,redirect} from "react-router";
import type {Route} from "./+types/create_project"

export async function action({request}:Route.ActionArgs){
    const formData=await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const endpoint = "http://backend:8000/projects";
    const response = await fetch(endpoint,{
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    });
    if (!response.ok){
        throw new Error(`Failed to create project : ${response.status}`)
    }
    return redirect("/projects");
}

export default function CreateProject(){
    return (
        <Form method="post" className="flex flex-col ">
            <input
                type="text"
                name="title"
                placeholder="Project title"
            />
            <textarea
                name="description"
                placeholder="Description"
            />
            <button type="submit">
                Create
            </button>
        </Form>
    );
}