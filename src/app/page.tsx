"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageManager } from "@/components/utils/page-manager";

export default function Page() {
  return (
    <PageManager anonymous>
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <p className="text-[48px] font-semibold">Robo App</p>
        <Button onClick={() => redirect("/login")}>Getting Start 🚀</Button>
      </div>
    </PageManager>
  );
}
