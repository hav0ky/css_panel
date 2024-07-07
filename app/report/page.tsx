import Link from "next/link"
import { ReportForm } from "./form"
import { ContentLayout } from "@/components/panel/content-layout"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function ReportPage() {

    return (
        <ContentLayout title="">
            <Card>
                <CardHeader>
                    <CardTitle>Report Player</CardTitle>
                    <CardDescription>
                        When submitting a player report, please provide as much detail as possible.
                        <br />
                        This will help us process your report swiftly and take appropriate action against the offender.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReportForm />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}