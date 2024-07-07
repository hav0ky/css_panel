import { ContentLayout } from "@/components/panel/content-layout";
import Image from "next/image";
import ServersTable from "@/components/servers";
import StatsPage from "@/components/stats";

export default function Home() {
  return (
    <ContentLayout title="">
      <div className="h-[100px] flex justify-center items-center overflow-hidden">
        <Image
          src={`/img/banner.jpg`}
          alt="banner"
          height={1200}
          width={1200}
          className="object-cover h-full w-full rounded-xl shadow-lg"
          priority
        />
      </div>
      <StatsPage />
      <ServersTable />
    </ContentLayout>
  );
}
