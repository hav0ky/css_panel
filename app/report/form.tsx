"use client"

import * as React from "react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { reportSchema } from "@/lib/schemas/reportSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSession } from "../provider";
import axios from "axios";

type Input = z.infer<typeof reportSchema>

interface ReportFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function ReportForm({ className, ...props }: ReportFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { user } = useSession()
    const form = useForm<Input>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            user: "",
            reason: ""
        },
    })

    async function onSubmit(data: Input) {
        setIsLoading(true)
        try {
            if (!user) {
                toast.error("User not signed In!")
                setIsLoading(false)
                return
            }

            if (!data.user || !data.reason) {
                toast.error("Fill all the details!")
                setIsLoading(false)
                return
            }
            await axios.post("/api/discord/webhook", { title: "Report Request", description: `${data.user} \n ${data.reason}`, name: user?.player_name, icon_url: user?.player_avatar, id: user?.id })
            toast.success("We've received your report request and will review it carefully before taking any necessary action.")
        } catch (error) {
            toast.error("Something went wrong :(")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className={className} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Steam ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Steam profile URL" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reason</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Please provide a detailed reason" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit Report
                    </Button>
                </form>
            </Form>
        </div>
    )
}