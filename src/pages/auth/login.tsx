import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { assets } from "@/assets/assets";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { supabase } from "@/config/client";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorHandler";
import { FormError } from "@/components/formError";
import { useNavigate } from "react-router";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setLoading(false);

      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      return;
    }
    console.log({ data });
    toast.success("Logged in successfully");
    navigate("/dashboard");
  };

  return (
    <div className="bg-linear-to-b from-[#8A2BE2] to-[#7B1FEA] w-screen min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm rounded-sm shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-blueViolet">
            Log in to flowva
          </CardTitle>
          <CardDescription>
            Log in to receive personalized recommendations
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
                        placeholder="example@flowvahub.com"
                        {...field}
                        className="h-12"
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
                      <div className="relative">
                        <Input
                          placeholder="*********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="h-12"
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

              <div className="text-right text-sm">
                <a className="text-blueViolet" href="#">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="bg-blueViolet hover:bg-purpleBlue cursor-pointer h-12 w-full rounded-full"
              >
                {loading ? "Logging in..." : "Sign in"}
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

          <Button variant="outline" className="w-full h-12 rounded-sm">
            <img
              src={assets.google_icon}
              alt="google icon"
              className="w-6 h-6"
            />
            Sign in with Google
          </Button>

          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a className="text-blueViolet" href="/signup">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
