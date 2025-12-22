import { Bell, Menu } from "lucide-react";
import { useNavbarContent } from "@/hooks/useNavbarContent";
import { Button } from "./ui/button";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
  const { title, subtitle } = useNavbarContent();

  return (
    <div className="sticky top-0 w-full z-50 flex items-center justify-between p-10">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden w-14 h-14 p-3"
          onClick={onMenuClick}
        >
          <Menu className="w-7 h-7" />
        </Button>

        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl text-[#1E1F24]">{title}</h2>
          <p className="text-sm text-[#62636C] font-normal">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
