import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth.store";

export default function ProtectedLayout() {
  const { user, loading } = useAuthStore();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
