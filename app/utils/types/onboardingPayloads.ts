import { z } from "zod";

export const userPayloadSchema = z
  .object({
    userId: z.string(),
    email: z.email(),
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2, "Last  name is required"),
    phoneNumber: z
      .string()
      .min(10, "You must enter a valid phone number")
      .optional(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export type IUserPayloadSchema = z.infer<typeof userPayloadSchema>;
