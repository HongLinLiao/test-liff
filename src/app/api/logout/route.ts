import { CookieKey, deleteCookie } from "@/lib/cookie";

export async function POST() {
  await deleteCookie(CookieKey.JWT);
  return Response.json({ success: true });
}
