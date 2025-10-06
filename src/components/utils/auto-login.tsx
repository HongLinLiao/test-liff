"use client";

import { FC, ReactNode, useState } from "react";
import { useAsync } from "react-use";

import { useLogin } from "@/hooks/login/useLogin";

interface AutoLoginProps {
  children: ReactNode;
}

export const AutoLogin: FC<AutoLoginProps> = ({ children }) => {
  const { getUserProfile } = useLogin();
  const [isLoading, setIsLoading] = useState(true);

  useAsync(async () => {
    try {
      await getUserProfile();
    } catch (error) {
      console.error("Auto login failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
};
