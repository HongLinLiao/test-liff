"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAsync } from "react-use";

import { PageManager } from "@/components/utils/page-manager";
import { useLineLogin } from "@/hooks/login/useLineLogin";
import { useLogin } from "@/hooks/login/useLogin";

export default function Page() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const { getAccessToken } = useLineLogin();
  const { loginFromLine, getUserProfile } = useLogin();

  useAsync(async () => {
    if (code && state) {
      const accessToken = getAccessToken();
      if (accessToken) {
        await loginFromLine(accessToken);
        await getUserProfile();
        replace("/home");
      }
    }
  }, [code, state, loginFromLine, getUserProfile]);

  return (
    <PageManager anonymous>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col items-center space-y-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-blue-500 dark:border-t-blue-400"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-300 dark:border-t-blue-600"></div>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 animate-pulse">
              Loading profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 animate-pulse">
              Please wait while we prepare your experience...
            </p>
          </div>

          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </PageManager>
  );
}
