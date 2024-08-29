"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RotateCw } from "lucide-react"
import { BanUser } from "@/server/bans"
import { z } from "zod"
import banSchema from "@/lib/schemas/banSchema"

type Input = z.infer<typeof banSchema>

interface BanSheetProps
    extends React.ComponentPropsWithRef<typeof Sheet> {
    admin: { id: string, player_name: string, player_avatar?: string }
}

export function BanSheet({ admin, ...props }: BanSheetProps) {
    const [isUpdatePending, startUpdateTransition] = React.useTransition()

    const form = useForm<Input>({
        resolver: zodResolver(banSchema),
        // defaultValues: {
        // },
    })

    function onSubmit(data: Input) {
        startUpdateTransition(async () => {

            await BanUser(data.player_name, data.player_steamid!, Number(data.duration), data.reason, data.comment!, admin.id, admin.player_name)

            form.reset()
            props.onOpenChange?.(false)
            toast.success("Player banned")
        })
    }

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Ban Player</SheetTitle>
                    <SheetDescription>
                        Ban a player from playing on servers
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="player_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Player Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="player_steamid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Player SteamID64</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="76561199107838150"
                                            {...field}
                                        />
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
                                        <Textarea
                                            placeholder="hack"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (mins)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="60"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="_type.reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reason</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="capitalize">
                                                <SelectValue placeholder="Select a label" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {tasks.label.enumValues.map((item) => (
                                                    <SelectItem
                                                        key={item}
                                                        value={item}
                                                        className="capitalize"
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormField
                            control={form.control}
                            name="dura"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="capitalize">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {tasks.status.enumValues.map((item) => (
                                                    <SelectItem
                                                        key={item}
                                                        value={item}
                                                        className="capitalize"
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="capitalize">
                                                <SelectValue placeholder="Select a priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {tasks.priority.enumValues.map((item) => (
                                                    <SelectItem
                                                        key={item}
                                                        value={item}
                                                        className="capitalize"
                                                    >
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                            <SheetClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </SheetClose>
                            <Button type="submit" disabled={isUpdatePending}>
                                {isUpdatePending && (
                                    <RotateCw
                                        className="mr-2 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                Submit
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}