import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters.").required("Name is required."),
  email: yup.string().email("Invalid email address.").required("Email is required."),
  password: yup.string().min(6, "Password must be at least 6 characters.").required("Password is required."),
});

// This creates a TypeScript type from our schema
export type TRegisterSchema = yup.InferType<typeof registerSchema>;

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email address.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export type TLoginSchema = yup.InferType<typeof loginSchema>;