import Link from "next/link"
import { AppealForm } from "./form"
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
                    <CardTitle>Protest a ban</CardTitle>
                    <CardDescription>
                        Before you proceed make sure you first check our banlist and search it by clicking <Link href={`/bans`} className="text-primary">here</Link> if you are listed and for what reason.
                        <br />
                        If you do find yourself listed on the banlist and find the reason for this to be untrue you can write a protest.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AppealForm />
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>What happens after you posted your protest?</CardTitle>
                    <CardDescription>
                        The admins will get notified of your protest. They will then review if the ban is conclusive. After reviewing you will get a reply, which usally means within 24 hours.
                        <br />
                        <span className="font-bold">Note:</span> Sending emails with threats to our admins, scolding or shouting will not get you unbanned and in fact we will delete your protest right away!
                    </CardDescription>
                </CardHeader>
            </Card>
        </ContentLayout>
    )
}