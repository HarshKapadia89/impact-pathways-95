import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/handbook/$slug")({
  component: () => <Outlet />,
});
