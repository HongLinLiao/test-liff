import { CookieKey, setCookie } from "@/lib/cookie";

export async function POST() {
  await setCookie(CookieKey.JWT, "test-token");
  return Response.json({ success: true });
}
