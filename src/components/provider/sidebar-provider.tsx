"use client";

import { usePathname } from "next/navigation";
import { ComponentProps, FC, ReactNode, useEffect, useState } from "react";

import { getItem, SessionStorageKey, setItem } from "@/lib/session-storage";

import { AppSidebar } from "../sidebar/app-sidebar";
import {
  SIDEBAR_DISABLE_SESSION_ROUTES,
  SIDEBAR_HIDDEN_ROUTES,
} from "../sidebar/const";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

interface CustomSidebarProviderProps
  extends ComponentProps<typeof SidebarProvider> {
  children: ReactNode;
}

export const CustomSidebarProvider: FC<CustomSidebarProviderProps> = ({
  children,
  ...props
}) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isDisableSidebar, setIsDisableSidebar] = useState(false);

  useEffect(() => {
    if (SIDEBAR_DISABLE_SESSION_ROUTES.includes(pathname)) {
      setItem<SessionStorageKey.IsDisableSidebar>(
        SessionStorageKey.IsDisableSidebar,
        true
      );
    }
    const isDisableSidebar = getItem(SessionStorageKey.IsDisableSidebar);

    setIsDisableSidebar(
      isDisableSidebar || SIDEBAR_HIDDEN_ROUTES.includes(pathname)
    );
    setIsLoading(false);
  }, [pathname]);

  if (isLoading) {
    return <></>;
  }

  if (isDisableSidebar) {
    return <main className="h-full">{children}</main>;
  }

  return (
    <SidebarProvider {...props}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
