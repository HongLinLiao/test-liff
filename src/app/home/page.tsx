import { PageManager } from "@/components/utils/page-manager";

export default function Home() {
  return (
    <PageManager>
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <p className="text-[48px] font-semibold">Home</p>
      </div>
    </PageManager>
  );
}
