import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
                index("routes/home.tsx"),
                route("projects","routes/projects.tsx"),
                route("projects/:project_id","routes/project_details.tsx"),
                route("projects/new","routes/create_project.tsx"),
                route("projects/:project_id/edit","routes/edit_project.tsx")
               ] satisfies RouteConfig;
