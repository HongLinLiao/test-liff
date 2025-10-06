import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";

import { LiffProvider } from "@/components/provider/liff-provider";
import { CustomSidebarProvider as SidebarProvider } from "@/components/provider/sidebar-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { AutoLogin } from "@/components/utils/auto-login";
import { AxiosProvider } from "@/contexts/axios-context";

const lineSeed = localFont({
  src: [
    {
      path: "../../public/fonts/LINESeedTW_TTF_Th.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/LINESeedTW_TTF_Rg.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/LINESeedTW_TTF_Bd.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/LINESeedTW_TTF_Eb.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-line-seed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robo",
  description: "LINE TW Robo APP",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarCookieOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lineSeed.variable} antialiased`}>
        <LiffProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AxiosProvider>
              <AutoLogin>
                <SidebarProvider defaultOpen={sidebarCookieOpen}>
                  {children}
                </SidebarProvider>
              </AutoLogin>
            </AxiosProvider>
          </ThemeProvider>
        </LiffProvider>
      </body>
    </html>
  );
}
