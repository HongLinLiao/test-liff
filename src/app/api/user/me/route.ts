import { CookieKey, hasCookie } from "@/lib/cookie";
import { User } from "@/types/user";

export async function GET() {
  if (await hasCookie(CookieKey.JWT)) {
    const user: User = {
      id: "test-id",
      name: "Sally",
      email: "test@google.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      provider: "line",
    };
    return Response.json({ isLoggedIn: true, user });
  } else {
    return Response.json({ isLoggedIn: false });
  }
}
