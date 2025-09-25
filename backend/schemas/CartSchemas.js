import { z } from "zod";

export const createCartItemSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Amount must be at least 1" })
    .default(1),
  productId: z.uuid(),
});
