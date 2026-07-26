import {Link} from "react-router";

export default function CreateProjectCard() {
    return (
        <Link to={"/projects/new"}>
        <div className="rounded-lg h-56 flex items-center justify-center bg-[#f7fbfd]">
            <h2>Create Project</h2>
        </div>
        </Link>
    );
}