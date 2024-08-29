"use client"

import * as React from "react"
// import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// import { deleteTasks } from "../_lib/actions"
import { RotateCw } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface Props
    extends React.ComponentPropsWithoutRef<typeof Dialog> {
    title: string;
    text: string;
    label: string;
    duration?: boolean;
    onAction: (reason: string, duration?: number) => Promise<void>;
}

export function UndoDialog({
    title,
    text,
    label,
    duration = false,
    onAction,
    ...props
}: Props) {
    const [isConfirmationPending, startConfirmationTransition] = React.useTransition()
    const [reason, SetReason] = React.useState('')
    const [durval, SetDurVal] = React.useState<number>(10)

    return (
        <Dialog {...props}>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {text}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full space-y-1">
                    <Label>{label} Reason</Label>
                    <Input name="reason" type="text" value={reason} onChange={(e) => SetReason(e.target.value)} placeholder="test" />
                    {duration &&
                        <>
                            <Label>{label} Duration</Label>
                            <Input name="duration" type="number" value={durval} onChange={(e) => SetDurVal(Number(e.target.value))} placeholder="60" />
                        </>
                    }
                </div>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete selected rows"
                        onClick={() => {
                            startConfirmationTransition(async () => {
                                await onAction(reason)
                                props.onOpenChange?.(false)
                            })
                        }}
                        disabled={isConfirmationPending}
                    >
                        {isConfirmationPending && (
                            <RotateCw
                                className="mr-2 w-4 h-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        {label}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}