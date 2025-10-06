import liff from "@line/liff";
import { useCallback } from "react";

import { environment } from "@/lib/environment";

const { nextPublicLiffId: liffId } = environment;

export const useLineLogin = () => {
  const init = useCallback(async () => {
    await liff.init({ liffId });
  }, []);

  const getProfile = useCallback(async () => {
    if (!liff.isLoggedIn()) {
      return null;
    }
    return await liff.getProfile();
  }, []);

  const login = useCallback(async () => {
    await liff.login();
  }, []);

  const logout = useCallback(async () => {
    await liff.logout();
  }, []);

  const getAccessToken = useCallback(() => {
    return liff.getAccessToken();
  }, []);

  const getIdToken = useCallback(() => {
    return liff.getDecodedIDToken();
  }, []);

  return { init, login, logout, getProfile, getAccessToken, getIdToken };
};
