import type { H3Event } from "h3";

export async function verifyAuth(event: H3Event): Promise<{
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
}> {
  const { isAuthenticated, userId } = event.context.auth();
  const token = await event.context.auth.getToken();
  return {
    isAuthenticated,
    userId: userId || null,
    token: token || null,
  };
}
