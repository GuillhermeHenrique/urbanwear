import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required!" }),
    email: z
      .string()
      .nonempty({ message: "E-mail is required!" })
      .email({ message: "Invalid e-mail!" }),
    password: z
      .string()
      .nonempty({ message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" }),
    confirmpassword: z
      .string()
      .nonempty({ message: "Confirm password is required!" }),
    admin: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match!",
    path: ["confirmpassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "E-mail is required!" })
    .email("Invalid e-mail!"),
  password: z.string().nonempty({ message: "Password is required!" }),
});
