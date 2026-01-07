import { ConvexError } from "convex/values";
import type { AppErrorData } from "~~/convex/lib/errors";

export function isAppError(error: unknown): error is ConvexError<AppErrorData> {
  return (
    error instanceof ConvexError &&
    typeof error.data === "object" &&
    error.data !== null &&
    "code" in error.data &&
    "statusMessage" in error.data
  );
}
