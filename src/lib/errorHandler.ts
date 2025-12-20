export const getErrorMessage = (
  error: unknown,
  fallback = "An error occurred"
): string => {
  if (error && typeof error === "object" && "message" in error) {
    const msg = (error as { message: string | null }).message;
    return msg ?? fallback;
  }

  // Native JS Error
  if (error instanceof Error) return error.message;

  // String errors
  if (typeof error === "string") return error;

  return fallback;
};
