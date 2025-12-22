import { useLocation } from "react-router";
import { navbarConfig } from "@/routes";
import type { NavbarRoute } from "@/routes";
export const useNavbarContent = () => {
  const location = useLocation();
  //   const { user } = useAuthStore();

  const user = { firstName: "John" };
  const pathname = location.pathname as NavbarRoute;

  const config = navbarConfig[pathname];

  if (!config) {
    return { title: "Dashboard", subtitle: "Welcome" };
  }

  return {
    title: config.title,
    subtitle:
      typeof config?.subtitle === "function"
        ? config.subtitle(user)
        : config.subtitle,
  };
};
