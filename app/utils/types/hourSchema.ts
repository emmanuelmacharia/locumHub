import { z } from "zod";
import { days } from "../data/time";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const timeSchema = z
  .string()
  .regex(timeRegex, "Invalid time format. Expected HH:MM (24-hour)");

const dayHoursSchema = z
  .object({
    open: timeSchema,
    close: timeSchema,
    is24Hours: z.boolean(),
    enabled: z.boolean(),
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

export interface DaySchedule {
  enabled: boolean;
  is24Hours: boolean;
  open: string;
  close: string;
}

export interface OperatingHours {
  [key: string]: DaySchedule;
}

export const formatTime = (time: string) => {
  if (!timeRegex.test(time)) {
    throw new Error(`Invalid time format: ${time}. Expected HH:MM (24-hour)`);
  }
  const [hours, minutes] = time.split(":") as [string, string];
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const getDefaultOperatingHours = (): OperatingHours => {
  const hours: OperatingHours = {};
  days.forEach((day) => {
    hours[day] = {
      enabled: day !== "sunday",
      is24Hours: false,
      open: "09:00",
      close: "18:00",
    };
  });
  return hours;
};
