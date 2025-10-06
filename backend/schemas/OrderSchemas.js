import { z } from "zod";

export const createUserDataSchema = z.object({
  name: z.string().nonempty({ message: "Name is required!" }),
  email: z
    .email({ message: "Invalid e-mail!" })
    .nonempty({ message: "E-mail is required!" }),
  cpf: z.string().length(11, { message: "CPF must have 11 digits!" }),
  phone: z.string().regex(/^\d{9,11}$/, { message: "Invalid phone number!" }),
  cep: z.string().length(8, { message: "CEP must have 9 digits!" }),
  address: z.string().nonempty({ message: "Address is required!" }),
  number: z.number(),
  complement: z.string().optional(),
  neighborhood: z.string().nonempty({ message: "Neighborhood is required!" }),
  city: z.string().nonempty({ message: "City is required!" }),
  state: z.string().nonempty({ message: "State is required!" }),
});
