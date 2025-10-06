import { ReactNode } from "react";

import { LoginGuard } from "./login-guard";

interface PageManagerProps {
  anonymous?: boolean;
  children: ReactNode;
}

export const PageManager = ({ anonymous, children }: PageManagerProps) => {
  return <LoginGuard anonymous={anonymous}>{children}</LoginGuard>;
};
