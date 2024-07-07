import { MutesTable } from "@/components/mutes";
import { RanksTable } from "@/components/ranks";
import RanksStatsPage from "@/components/ranks/stats";
import { GetMutes } from "@/server/mutes";
import { GetRanks } from "@/server/ranks";
import searchParamsSchema from "@/lib/schemas/searchParams";
import { TablePageProps } from "@/types/tablePageProps";
import { LineChart } from "lucide-react";
import { ContentLayout } from "@/components/panel/content-layout";

export default function RanksPage({ searchParams }: TablePageProps) {
    const search = searchParamsSchema.parse(searchParams)

    const get_ranks = GetRanks(search.page, search.per_page)
    return (
        <ContentLayout title="">
            <RanksStatsPage />
            <RanksTable ranksPromise={get_ranks} />
        </ContentLayout>
    )
}