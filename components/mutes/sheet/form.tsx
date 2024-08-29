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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MuteUser } from "@/server/mutes"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import muteSchema, { typeSchema } from "@/lib/schemas/muteSchema"

type Input = z.infer<typeof muteSchema>

interface MuteSheetProps
    extends React.ComponentPropsWithRef<typeof Sheet> {
    admin: { id: string, player_name: string, player_avatar?: string }
}

export function MuteSheet({ admin, ...props }: MuteSheetProps) {
    const [isUpdatePending, startUpdateTransition] = React.useTransition()

    const form = useForm<Input>({
        resolver: zodResolver(muteSchema),
        // defaultValues: {
        // },
    })

    function onSubmit(data: Input) {
        startUpdateTransition(async () => {

            await MuteUser(data.player_name, data.player_steamid!, Number(data.duration), data.reason, data.type, data.comment!, admin.id, admin.player_name)

            form.reset()
            props.onOpenChange?.(false)
            toast.success("Player muted")
        })
    }

    return (
        <Sheet {...props}>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>Mute/Gag Player</SheetTitle>
                    <SheetDescription>
                        Mute/Gag a player from playing on servers
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
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {typeSchema.options.map((item) => (
                                                <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={item} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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