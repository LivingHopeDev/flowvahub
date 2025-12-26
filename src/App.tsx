import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/errorFallback";
import NotFound from "./components/notFound";
import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import ProtectedLayout from "./layouts/protectedLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardPage from "./pages/dashboard/dashboardPage";
import RewardsPage from "./pages/dashboard/rewardHub/rewardPage";
import SettingsPage from "./pages/dashboard/settings/settingsPage";
import DiscoverPage from "./pages/dashboard/discover/discoverPage";
import SubscriptionPage from "./pages/dashboard/subscription/subscriptionPage";
import LibraryPage from "./pages/dashboard/library/libraryPage";
import TechStackPage from "./pages/dashboard/techStack/techStackPage";
import AuthCallback from "./pages/auth/authCallback";
function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorFallback />,
      children: [
        { path: "/", element: <LoginForm /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/signup", element: <SignupForm /> },
        { path: "/auth/callback", element: <AuthCallback /> },
        {
          path: "/dashboard",
          element: <ProtectedLayout />,
          errorElement: <ErrorFallback />,

          children: [
            {
              element: (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <DashboardLayout />
                </ErrorBoundary>
              ),
              errorElement: <ErrorFallback />,
              children: [
                { index: true, element: <DashboardPage /> },
                { path: "rewards", element: <RewardsPage /> },
                { path: "discover", element: <DiscoverPage /> },
                { path: "subscriptions", element: <SubscriptionPage /> },
                { path: "library", element: <LibraryPage /> },
                { path: "settings", element: <SettingsPage /> },
                { path: "tech-stack", element: <TechStackPage /> },
              ],
            },
          ],
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Error caught by ErrorBoundary:", error, info);
      }}
    >
      <Toaster />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
