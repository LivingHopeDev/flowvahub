import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assets } from "@/assets/assets";
import { Separator } from "@radix-ui/react-separator";
import { navItems } from "@/routes";
import { useAuthStore } from "@/store/auth.store";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import { NavLink } from "react-router";
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const handleNavigate = () => onClose();
  const { user, signOut } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 inset-y-0 left-0 w-64 bg-white border-r overflow-y-auto h-screen transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0 z-60"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <img
            src={assets.flowva_logo}
            alt="Flowva Logo"
            className="w-50 h-20"
          />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                end={true}
                onClick={handleNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-purple-100 text-blueViolet"
                      : "text-gray-700 hover:bg-purple-100"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full px-4 py-4 space-y-5">
          <Separator className="border border-gray-400" />

          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex w-full items-center gap-3 rounded-md p-2 cursor-pointer hover:bg-purple-100 transition"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-200 text-sm font-semibold text-blueViolet">
                {getInitials(user?.user_metadata?.name || "U")}
              </div>

              <div className="text-left text-sm">
                <p className="font-medium">{user?.user_metadata?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.user_metadata?.email}
                </p>
              </div>
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />

                <div className="absolute bottom-full mb-2 left-0 z-50 w-55 rounded-md border border-blueViolet bg-white shadow-lg">
                  <ul className="text-sm px-2 py-3">
                    <li>
                      <button
                        className="w-full px-4 py-2 text-left rounded-md hover:bg-purple-100"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        Feedback
                      </button>
                    </li>

                    <li>
                      <button
                        className="w-full px-4 py-2 text-left rounded-md hover:bg-purple-100"
                        onClick={() => {
                          setMenuOpen(false);
                        }}
                      >
                        Support
                      </button>
                    </li>

                    <Separator className="my-1" />

                    <li>
                      <button
                        className="w-full px-4 py-2 text-left rounded-md text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
