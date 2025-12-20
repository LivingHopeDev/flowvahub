import type { FallbackProps } from "react-error-boundary";
import { useRouteError, useNavigate } from "react-router";

type CombinedFallbackProps = Partial<FallbackProps>;

export function ErrorFallback(props: CombinedFallbackProps) {
  const routeError = useRouteError() as unknown;
  const error = props?.error ?? routeError;
  const navigate = useNavigate();

  if (error instanceof Error) {
    console.error("Error caught by boundary:", error);
  }

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-linear-to-br from-gray-50 to-gray-100"
    >
      <div className="max-w-md">
        {/* Icon */}
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          We're sorry, but something unexpected happened. Our team has been
          notified and is working to fix the issue.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {props?.resetErrorBoundary && (
            <button
              onClick={props.resetErrorBoundary}
              className="px-6 py-3 bg-royalblue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          )}

          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
