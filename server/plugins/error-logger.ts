interface ErrorBody {
  statusCode: number;
  message?: string;
  stack?: string;
}

function isErrorBody(body: unknown): body is ErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "statusCode" in body &&
    typeof body.statusCode === "number"
  );
}
export default defineNitroPlugin((nitro) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nitro.hooks.hook("error", async (error, { event }) => {
    // eslint-disable-next-line no-console
    console.error("Server error: ", error);
    // error sanitizer
    if (isErrorBody(error) && error.statusCode >= 400) {
      if ("stack" in error) delete error.stack;
      if (error.statusCode >= 500) {
        error.message = "An unexpected error occurred";
      }
    }
  });
});
