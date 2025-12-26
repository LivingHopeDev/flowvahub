import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 px-4">
      <div className="relative flex flex-col items-center text-center max-w-md">
        <div
          className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle at top, #0020e0 0, transparent 60%)",
          }}
        />

        <div className="inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium mb-6 gap-1">
          <AlertCircle className="h-3 w-3" />
          <span className="uppercase tracking-[0.16em] text-slate-300">
            Error 404
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          Page not found
        </h1>

        <p className="text-sm sm:text-base text-slate-300 mb-8">
          The page you're looking for doesn't exist or may have been moved.
          Double-check the URL, or head back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button
            asChild
            className="w-full sm:w-auto font-medium"
            style={{ backgroundColor: "#8a2be2" }}
          >
            <Link to="/dashboard">Go back home</Link>
          </Button>

          {/* <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-slate-700 text-slate-100 hover:bg-slate-900"
          >
            <Link to="/contact">Contact support</Link>
          </Button> */}
        </div>

        <p className="mt-8 text-xs text-slate-500">
          If you believe this is a mistake, please report the broken link.
        </p>
      </div>
    </div>
  );
}
