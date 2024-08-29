"use client"

import React from "react"
import { BanSheet } from "./form"
import { Ban } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BanMenu({ admin }: { admin: { id: string, player_name: string, player_avatar?: string } }) {
    const [showUpdateTaskSheet, setShowUpdateTaskSheet] =
        React.useState(false)

    return (
        <>
            <BanSheet
                open={showUpdateTaskSheet}
                onOpenChange={setShowUpdateTaskSheet}
                admin={admin}
            />
            <Button onClick={() => setShowUpdateTaskSheet(true)} size="sm" variant="outline">
                <Ban className="mr-2 h-4 w-4" />
                <span>Ban</span>
            </Button>
        </>
    )
}