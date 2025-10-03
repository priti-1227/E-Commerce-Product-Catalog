"use client";

import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Import from yup
import { TRegisterSchema, registerSchema } from "@/lib/validators";
import { useRegisterMutation } from "@/features/products/authApiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: yupResolver(registerSchema), // Use the yup resolver
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      await register(data).unwrap();
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.data?.message || "Registration failed.");
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...formRegister("name")} // Register the input with React Hook Form
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...formRegister("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...formRegister("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
