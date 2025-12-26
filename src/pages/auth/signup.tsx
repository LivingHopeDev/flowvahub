import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { assets } from "@/assets/assets";
import { signupSchema, type SignupFormValues } from "@/schemas/auth.schema";
import { supabase } from "@/config/client";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";
import { FormError } from "@/components/formError";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [validatingReferral, setValidatingReferral] = useState<boolean>(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  // Validate referral code on mount
  useEffect(() => {
    const ref = searchParams.get("ref");
    console.log("Referral code from URL:", ref);
    if (ref) {
      setReferralCode(ref);
      validateReferralCode(ref);
    }
  }, [searchParams]);

  const validateReferralCode = async (code: string) => {
    setValidatingReferral(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, referral_code")
        .eq("referral_code", code);
      if (error || !data) {
        setReferralValid(false);
        setError(
          "Invalid referral code. Please check the link or sign up without a referral."
        );
      } else {
        setReferralValid(true);
        setError(null);
      }
    } catch (err) {
      setReferralValid(false);
      setError("Could not validate referral code.");
    } finally {
      setValidatingReferral(false);
    }
  };

  const onSubmit = async (values: SignupFormValues) => {
    if (referralCode && referralValid === false) {
      setError(
        "Cannot sign up with invalid referral code. Please use a valid link or remove the referral code from the URL."
      );
      return;
    }

    setLoading(true);
    setError(null);

    const signupData: any = {
      email: values.email,
      password: values.password,
    };

    if (referralCode && referralValid) {
      signupData.options = {
        data: {
          referral_code: referralCode,
        },
      };
    }

    const { error } = await supabase.auth.signUp(signupData);

    if (error) {
      setLoading(false);
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      return;
    }

    toast.success("Success: Verification email sent.");
    navigate("/login");
  };

  const signInWithGoogle = async () => {
    if (referralCode && referralValid) {
      sessionStorage.setItem("pending_referral", referralCode);
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const canSubmit =
    !validatingReferral && (referralCode ? referralValid === true : true);

  return (
    <div className="bg-linear-to-b from-[#8A2BE2] to-[#7B1FEA] w-screen min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm rounded-sm shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-blueViolet">
            Create Your Account
          </CardTitle>
          <CardDescription>Sign up to manage your tools</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {validatingReferral && (
            <Alert>
              <AlertDescription>Validating referral code...</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            {error && <FormError message={error} />}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@flowvahub.com"
                        className="h-12 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="h-12 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="*********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-12 rounded-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-4.5 text-xs text-blueViolet"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!canSubmit || loading}
                className="bg-blueViolet hover:bg-purpleBlue cursor-pointer h-12 w-full rounded-full disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Sign up Account"}
              </Button>
            </form>
          </Form>

          <div className="flex items-center w-full gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              or
            </span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            onClick={signInWithGoogle}
            disabled={!canSubmit}
            className="w-full h-12 rounded-sm disabled:opacity-50"
          >
            <img
              src={assets.google_icon}
              alt="google icon"
              className="w-6 h-6"
            />
            Sign in with Google
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <a className="text-blueViolet" href="/login">
              Log in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
