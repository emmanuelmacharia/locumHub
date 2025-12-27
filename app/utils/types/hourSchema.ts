import { z } from "zod";

const dayEnum = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "holidays",
]);

export const hourSchemav1 = z.array(
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("regular"),
      days: z.array(dayEnum),
      open: z.string(),
      close: z.string(),
    }),
    z.object({
      type: z.literal("24hours"),
      days: z.array(dayEnum),
    }),
    z.object({
      type: z.literal("closed"),
      days: z.array(dayEnum),
    }),
  ])
);

const dayHoursSchema = z
  .object({
    open: z.string(),
    close: z.string(),
  })
  .nullable();

export const hoursSchema = z.object({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema,
  holidays: dayHoursSchema,
});
