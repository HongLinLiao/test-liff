"use client";

import { FC, ReactNode, useState } from "react";
import { useAsync } from "react-use";

import { useLineLogin } from "@/hooks/login/useLineLogin";

interface LiffProviderProps {
  children: ReactNode;
}

export const LiffProvider: FC<LiffProviderProps> = ({ children }) => {
  const { init } = useLineLogin();

  const [isLoading, setIsLoading] = useState(true);

  useAsync(async () => {
    try {
      await init();
    } catch (error) {
      alert("LIFF initialization failed: " + error);
      console.error("LIFF initialization failed", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? null : children}</>;
};
