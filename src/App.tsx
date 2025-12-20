import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/errorFallback";
import NotFound from "./components/notFound";
import LoginForm from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import ProtectedLayout from "./layouts/protectedLayout";
function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorFallback />,
      children: [
        { path: "/", element: <LoginForm /> },
        { path: "/login", element: <LoginForm /> },
        { path: "/signup", element: <SignupForm /> },

        {
          element: <ProtectedLayout />,
          children: [
            {
              path: "/dashboard",
              element: <div>Dashboard</div>,
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
