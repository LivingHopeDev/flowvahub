import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { supabase } from "@/config/client";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      console.log("=== AUTH CALLBACK START ===");
      console.log(
        "sessionStorage contents:",
        sessionStorage.getItem("pending_referral")
      );
      console.log("URL params:", searchParams.get("ref"));

      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        console.log("User authenticated:", user?.id);

        if (error || !user) {
          toast.error("Authentication failed");
          navigate("/login");
          return;
        }

        const pendingReferral = sessionStorage
          .getItem("pending_referral")
          ?.trim();
        console.log("Pending referral to process:", pendingReferral);

        if (pendingReferral) {
          const { data: referrerProfile } = await supabase
            .from("profiles")
            .select("id, referral_code")
            .eq("referral_code", pendingReferral)
            .maybeSingle();

          console.log("Found referrer:", referrerProfile);

          // Rest of your code...
        }

        navigate("/dashboard");
      } catch (err) {
        console.error("Error:", err);
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blueViolet"></div>
    </div>
  );
};

export default AuthCallback;
