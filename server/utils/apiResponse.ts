export type APISuccess<T> = {
  ok: true;
  data: T;
  statusCode: number;
};

export type APIError = {
  ok: false;
  statusCode: number;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
};

export type APIResponse<T> = APISuccess<T> | APIError;

export function success<T>(statusCode: number, data: T): APISuccess<T> {
  return {
    ok: true,
    data,
    statusCode,
  };
}

export function failure(statusCode: number, error: unknown): APIError {
  if (error instanceof Error) {
    return {
      ok: false,
      statusCode,
      error: {
        message: error.message || "An error occurred",
      },
    };
  }

  if (typeof error === "string") {
    return { ok: false, statusCode, error: { message: error } };
  }

  if (typeof error === "object" && error !== null) {
    const message = error as Record<string, unknown>;
    const errMessage =
      typeof message.message === "string"
        ? message.message
        : "An error occurred";
    return {
      ok: false,
      statusCode,
      error: {
        message: errMessage,
        details: message.details,
      },
    };
  }

  return {
    ok: false,
    statusCode,
    error: {
      message: "An unknown error occurred",
    },
  };
}
