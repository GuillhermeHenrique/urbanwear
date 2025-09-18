import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().nonempty({ message: "Name is required!" }),
  category: z.enum(["TSHIRT", "SHORTS", "COAT", "PANTS", "SNEAKERS"], {
    required_error: "Category is required!",
  }),
  price: z
    .string()
    .nonempty({ message: "Price is required!" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid decimal!" }),
});

export default createProductSchema;
