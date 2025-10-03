"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TLoginSchema, loginSchema } from "@/lib/validators";
import { useLoginMutation } from "@/features/products/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";

export function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const response = await login(data).unwrap();

      toast.success("Login successful!");
      dispatch(setCredentials({ user: response.user, token: response.token }));

      // --- IMPORTANT: Handle the JWT ---
      // We store the token in localStorage to keep the user logged in.
      localStorage.setItem("authToken", response.token);

      // Redirect to the homepage after successful login
      router.push("/");
      router.refresh(); // Forces a refresh to update server-side user state
    } catch (error: any) {
      toast.error(error.data?.message || "Login failed.");
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Logging In..." : "Login"}
      </Button>
    </form>
  );
}
