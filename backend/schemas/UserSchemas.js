import { z } from "zod";

export const editUserSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required!" }),
    email: z
      .string()
      .nonempty({ message: "E-mail is required!" })
      .email({ message: "Invalid e-mail" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters!" })
      .optional(),
    confirmpassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match!",
    path: ["confirmpassword"],
  });
