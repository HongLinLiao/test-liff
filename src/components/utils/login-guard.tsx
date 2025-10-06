"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";

interface LoginGuardProps {
  anonymous?: boolean;
  children: ReactNode;
}

export const LoginGuard: FC<LoginGuardProps> = ({ anonymous, children }) => {
  const { replace } = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (anonymous) {
      setIsLoading(false);
      return;
    }

    if (!user) {
      replace("/login");
    } else {
      setIsLoading(false);
    }
  }, [anonymous, replace, user]);

  if (isLoading) {
    return <></>;
  }

  return children;
};
