"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAsync } from "react-use";

import { MiniAppLogin } from "@/components/utils/mini-app-login";
import { PageManager } from "@/components/utils/page-manager";
import { useLineLogin } from "@/hooks/login/useLineLogin";
import { useLogin } from "@/hooks/login/useLogin";
import { useUser } from "@/hooks/useUser";

export default function MiniAppDrawPage() {
  const { replace } = useRouter();
  const { getAccessToken } = useLineLogin();
  const { loginFromLine, getUserProfile } = useLogin();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useAsync(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      if (user?.provider === "line") {
        replace("/draw");
        return;
      }
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Failed to retrieve LIFF profile");
      }
      await loginFromLine(accessToken);
      await getUserProfile();
      replace("/draw");
    } catch (error) {
      setIsError(true);
      console.error("Error during LIFF dependent operation", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <PageManager anonymous>
      <MiniAppLogin isLoading={isLoading} isError={isError} />
    </PageManager>
  );
}
