import { createFileRoute, Navigate, Outlet, useLocation } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";

// The old "India" index page merged into /career-library.
// Stream (/handbook/$slug) and profession pages still render through this layout.
export const Route = createFileRoute("/handbook")({
  head: () => ({
    meta: [
      { title: "Career Library — HBK Careers" },
      { name: "description", content: "Browse 48 career streams and 1,651 professions from A to Z." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: HandbookLayout,
});

function HandbookLayout() {
  const location = useLocation();

  if (location.pathname === "/handbook" || location.pathname === "/handbook/") {
    return <Navigate to="/career-library" replace />;
  }

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
