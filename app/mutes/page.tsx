import { BansTable } from "@/components/bans";
// import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
// import query from "@/utils/functions/db";
import isAdmin from "@/lib/functions/isAdmin";
import { validateRequest } from "@/lib/auth";
import searchParamsSchema from "@/lib/schemas/searchParams";
// import { SearchParams } from "@/utils/types/table";
import { TablePageProps } from "@/types/tablePageProps";
import { ContentLayout } from "@/components/panel/content-layout";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { GetMutes } from "@/server/mutes";
import { MutesTable } from "@/components/mutes";

export default async function MutesPage({ searchParams }: TablePageProps) {
    const search = searchParamsSchema.parse(searchParams)

    const get_mutes = GetMutes(search.page, search.per_page)
    const { user } = await validateRequest()
    const is_admin = user ? await isAdmin(user.id!) : false

    return (
        <ContentLayout title="">
            <Card>
                <CardHeader>
                    <CardTitle>Mutes / Gags</CardTitle>
                    <CardDescription>List of muted or gagged players.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MutesTable mutesPromise={get_mutes} is_admin={is_admin} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}