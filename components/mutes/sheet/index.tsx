"use client"

import React from "react"
import { Ban, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MuteSheet } from "./form"

export default function MuteMenu({ admin }: { admin: { id: string, player_name: string, player_avatar?: string } }) {
    const [showUpdateTaskSheet, setShowUpdateTaskSheet] =
        React.useState(false)
    return (
        <>
            <MuteSheet
                open={showUpdateTaskSheet}
                onOpenChange={setShowUpdateTaskSheet}
                admin={admin}
            />
            <Button onClick={() => setShowUpdateTaskSheet(true)} size="sm" variant="outline">
                <MicOff className="mr-2 h-4 w-4" />
                <span>Mute</span>
            </Button>
        </>
    )
}