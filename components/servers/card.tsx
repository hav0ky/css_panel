'use client'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Copy, Play, Users } from "lucide-react"
import { useState } from "react"
import { SafeServerInfo } from "@/lib/functions/query/ServerQuery"
import PlayersTable from "./players"
import { toast } from "sonner"
import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import { Progress } from "../ui/progress"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"

export function get_map_col(name: string): string {
    let col = "text-zinc-300"

    switch (name) {
        case "de_mirage":
            col = "text-purple-300"
            break;
        case "de_inferno":
            col = "text-red-300"
            break;
        case "de_dust2":
            col = "text-yellow-300"
            break;
        case "cs_office":
            col = "text-teal-300"
            break;
        case "de_overpass":
            col = "text-cyan-300"
            break;
        default:
            col = "text-zinc-300"
            break;
    }
    return col
}

const ServerCard = ({ serverId }: { serverId: number }) => {
    const { data, isLoading, error } = useSWR<SafeServerInfo>(`/api/servers/${serverId}`, fetcher)

    if (!data) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
            </div>
        )
    }

    return (
        <div className={`bg-right bg-cover bg-no-repeat rounded-2xl hover:-translate-y-1 transform-gpu transition-transform duration-300 ease-in-out shadow-xl`} style={{ backgroundImage: `url('/img/maps/${data.map}.webp')` }}>
            <div className="p-4 bg-gradient-to-r from-black via-black/70 to-transparent rounded-2xl border">
                {/* <Collapsible
                    className="space-y-2"
                > */}
                <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-3 w-1/2 sm:w-3/4 pb-2">
                        <h4 className="font-semibold text-zinc-100 truncate">
                            {data.hostname}
                        </h4>
                        <Progress value={data.playersPercentage} />
                    </div>
                    <div className="cursor-default inline-flex items-center rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-foreground bg-black text-zinc-300 -mt-7">
                        <span className="relative inline-flex rounded-full h-2 w-2 mr-2 animate-pulse transition-colors bg-blue-500"></span>
                        {data.players as number}/{data.maxPlayers} players
                    </div>
                </div>
                <div className="flex flex-wrap items-center space-x-4 text-sm justify-center sm:justify-start">
                    <p className={cn("text-sm", get_map_col(data.map))}>
                        {data.map}
                    </p>
                    <Button
                        className="rounded-xl text-xs uppercase font-semibold text-zinc-200"
                        variant="warning"
                        size="sm"
                        onClick={() => { navigator.clipboard.writeText(data.address); toast.success(`${data.address} copied to clipboard.`) }}
                    >
                        <Copy className="w-3.5 h-3.5 mr-1.5 text-yellow-300" />
                        {data.address}
                    </Button>
                    {/* <CollapsibleTrigger asChild>
                            <Button
                                className="rounded-xl uppercase text-xs font-semibold hidden lg:flex text-zinc-200"
                                variant="primary"
                                size="sm"
                            >
                                <Users className="w-3.5 h-3.5 mr-1.5 text-zinc-300" />
                                players
                            </Button>
                        </CollapsibleTrigger> */}
                    <Button
                        className="rounded-xl text-xs uppercase font-semibold text-zinc-200"
                        variant="success"
                        size="sm"
                        onClick={(e) => { e.preventDefault(); window.location.href = `steam://connect/${data.address}` }}
                    >
                        <Play className="w-3.5 h-3.5 mr-1.5 fill-current text-green-300" />
                        Connect
                    </Button>
                </div>
                {/* <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <PlayersTable players={data.players as []} />
                    </CollapsibleContent>
                </Collapsible> */}
            </div>
        </div>
    )
}

export default ServerCard