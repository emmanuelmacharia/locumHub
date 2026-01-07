import { ConvexError } from "convex/values";

export type AppErrorData = {
  code: "USER_EXISTS" | "UNAUTHORIZED" | "DUPLICATE_ENTRY" | "NOT_FOUND";
  statusMessage: string;
  statusCode: number;
};

export function appError(data: AppErrorData): never {
  throw new ConvexError<AppErrorData>(data);
}
