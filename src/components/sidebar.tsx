import { useState } from "react";
import {
  Menu,
  Home,
  Compass,
  Library,
  Layers,
  CreditCard,
  Gift,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assets } from "@/assets/assets";
import { Separator } from "@radix-ui/react-separator";

const navItems = [
  { label: "Home", icon: Home, href: "/dashboard" },
  { label: "Discover", icon: Compass, href: "/dashboard/discover" },
  { label: "Library", icon: Library, href: "/dashboard/library" },
  { label: "Tech Stack", icon: Layers, href: "/dashboard/tech-stack" },
  {
    label: "Subscriptions",
    icon: CreditCard,
    href: "/dashboard/subscriptions",
  },
  {
    label: "Rewards Hub",
    icon: Gift,
    href: "/dashboard/rewards",
    active: true,
  },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Header  */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b bg-white md:hidden">
        <div className="flex items-center justify-between w-full px-4">
          <img
            src={assets.flowva_logo}
            alt="Flowva Logo"
            className="w-50 h-20"
          />
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu />
          </Button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed z-50 inset-y-0 left-0 w-64 bg-white border-r transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:translate-x-0"
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
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition",
                  item.active
                    ? "bg-purple-100 text-blueViolet"
                    : "text-md hover:bg-purple-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="absolute bottom-0 w-full px-4 py-4 space-y-5">
          <Separator className="border border-gray-400 " />
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-200 text-sm font-semibold text-blueViolet">
              S
            </div>
            <div className="text-sm">
              <p className="font-medium">Sarah</p>
              <p className="text-xs text-muted-foreground">
                nixonh869@fftube.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
