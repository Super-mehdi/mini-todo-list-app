import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.24),transparent_30%),linear-gradient(135deg,_#f8fbff_0%,_#f6f7fb_45%,_#f3f4f6_100%)] text-slate-800 antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{message}</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{details}</p>
        {stack && (
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
