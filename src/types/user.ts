export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "line" | "google" | "facebook" | "system";
}

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}
