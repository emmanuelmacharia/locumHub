import { ConvexError } from "convex/values";

export type AppErrorData = {
  code: "USER_EXISTS" | "EMAIL_EXISTS" | "NOT_FOUND" | "UNAUTHORIZED";
  statusMessage: string;
  statusCode: number;
};

export function appError(data: AppErrorData): never {
  throw new ConvexError<AppErrorData>(data);
}
