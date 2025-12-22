import { useState } from "react";
import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router";
import DashboardNavbar from "@/components/dashboardNavbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col overflow-auto">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
