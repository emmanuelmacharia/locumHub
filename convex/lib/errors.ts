import { ConvexError } from "convex/values";

export type AppErrorData = {
  code:
    | "USER_EXISTS"
    | "UNAUTHORIZED"
    | "DUPLICATE_ENTRY"
    | "NOT_FOUND"
    | "INVALID_PATCH"
    | "FORBIDDEN"
    | "INVALID_ACCOUNT_TYPE"
    | "CONVEX_ERROR";
  statusMessage: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export function appError(data: AppErrorData): never {
  throw new ConvexError<AppErrorData>(data);
}
