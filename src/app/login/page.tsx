"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { PageManager } from "@/components/utils/page-manager";
import { useLineLogin } from "@/hooks/login/useLineLogin";
import { useUser } from "@/hooks/useUser";

export default function LoginPage() {
  const { replace } = useRouter();
  const { user } = useUser();
  const { login } = useLineLogin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      replace("/home");
      return;
    }
    setIsLoading(false);
  }, [isLoading, replace, user]);

  const handleLineLogin = async () => {
    await login();
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <PageManager anonymous>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
              歡迎回來
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              請選擇登入方式
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Button
              onClick={handleLineLogin}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-3 py-4 bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
            >
              <Image src="/line.png" alt="LINE" width={20} height={20} />
              <span className="text-base font-medium">使用 LINE 登入</span>
            </Button>
            <Button
              onClick={handleFacebookLogin}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-3 py-4 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
            >
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              <span className="text-base font-medium">使用 Facebook 登入</span>
            </Button>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-3 py-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Image src="/google.png" alt="Google" width={20} height={20} />
              <span className="text-base font-medium">使用 Google 登入</span>
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              點擊登入即表示您同意我們的服務條款和隱私政策
            </p>
          </div>
        </div>
      </div>
    </PageManager>
  );
}
