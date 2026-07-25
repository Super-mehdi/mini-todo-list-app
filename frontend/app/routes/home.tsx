import type { Route } from "./+types/home";
import Hello  from "../components/hello";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Medo" }
  ];
}

export default function Home() {
  return <Hello />;
}
