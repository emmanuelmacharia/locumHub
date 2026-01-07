import { z } from "zod";
import { hoursSchema } from "./hourSchema";

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
    clerkCreatedAt: z.coerce.date(),
    clerkUpdatedAt: z.coerce.date(),
  })
  .strict();

export type IUserPayloadSchema = z.infer<typeof userPayloadSchema>;

export const createPharmacySchema = z.object({
  businessName: z
    .string()
    .min(2, "Pharmacy name must be at least 2 characters long"),
  licenseNumber: z
    .string()
    .min(8, "Pharmacy license number must be at least 8 characters long"),
  contactPhone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long"),
  contactEmail: z.email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters long"),
  postcode: z.string().min(4, "Postcode must be at least 4 characters long"),
  city: z.string().min(2, "City must be at least 2 characters long"),
  country: z.string().min(2, "Country must be at least 2 characters long"),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
  operatingHours: hoursSchema,
  userId: z.string(),
});

export type ICreatePharmacySchema = z.infer<typeof createPharmacySchema>;

export type ICreatePharmacyPrimitive = Pick<
  ICreatePharmacySchema,
  "businessName" | "contactEmail" | "contactPhone" | "licenseNumber" | "userId"
>;
