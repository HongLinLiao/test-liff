import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useAxios } from "@/contexts/axios-context";
import { login } from "@/services/auth/login";
import { logout as logoutRequest } from "@/services/auth/logout";
import { getCurrentUserProfile } from "@/services/auth/profile";

import { useUser } from "../useUser";

import { useLineLogin } from "./useLineLogin";

export const useLogin = () => {
  const { push } = useRouter();
  const { axios } = useAxios();
  const { user, setUser, removeUser } = useUser();
  const { logout: lineLogout } = useLineLogin();

  const loginFromLine = useCallback(
    async (accessToken: string): Promise<void> => {
      await login(axios, accessToken);
    },
    [axios]
  );

  const getUserProfile = useCallback(async () => {
    const { isLoggedIn, user } = await getCurrentUserProfile(axios);
    if (isLoggedIn && user) {
      setUser(user);
    }
  }, [axios, setUser]);

  const logout = useCallback(async () => {
    if (user?.provider === "line") {
      lineLogout().catch(error => {
        console.error("Error during LIFF logout", error);
      });
    }

    await logoutRequest(axios);
    removeUser();
    push("/login");
  }, [axios, lineLogout, push, removeUser, user?.provider]);

  return { loginFromLine, getUserProfile, logout };
};
