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
function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorFallback />,
      children: [
        { path: "/", element: <LoginForm /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/signup", element: <SignupForm /> },

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
