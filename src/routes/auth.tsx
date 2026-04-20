import { createFileRoute, redirect } from "@tanstack/react-router";

// Auth has been removed from the project. /auth now just sends visitors home.
export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
