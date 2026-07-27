import type { Task } from "~/models/task";
import { Form, Link } from "react-router";

interface TaskTableProps {
  tasks: Task[];
  projectId: number;
}

function getStatusClasses(status: string) {
  if (status === "done") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (status === "in progress") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-slate-100 text-slate-700";
}

export default function TaskTable({ tasks, projectId }: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/80 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Edit
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/80">
            {tasks.map((task) => (
              <tr key={task.id} className="text-sm text-slate-700">
                <td className="px-4 py-3 font-medium text-slate-900">{task.title}</td>
                <td className="max-w-xs px-4 py-3 text-slate-600">{task.description}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/projects/${projectId}/tasks/${task.id}/edit`}
                    className="font-medium text-sky-700 transition hover:text-sky-900"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Form method="post">
                    <input type="hidden" name="task_id" value={task.id} />
                    <button
                      type="submit"
                      name="intent"
                      value="delete-task"
                      className="font-medium text-rose-600 transition hover:text-rose-700"
                    >
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}