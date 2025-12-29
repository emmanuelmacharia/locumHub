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
  openTime: string;
  closeTime: string;
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
      enabled: day !== "Sunday",
      is24Hours: false,
      openTime: "09:00",
      closeTime: "18:00",
    };
  });
  return hours;
};
