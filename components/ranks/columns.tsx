import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import { updateTask } from "../_lib/actions"
// import { getPriorityIcon, getStatusIcon } from "../_lib/utils"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"
// import { UpdateTaskSheet } from "./update-task-sheet"
import { MoreHorizontal, ShieldBan } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { Progress } from "../ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ExtRank } from "@/server/ranks"
import Image from "next/image"
import { format, render, cancel, register } from 'timeago.js';

interface i_rank {
    gold: string;
    red: string;
    pink: string;
    purple: string;
    blue: string;
    uncommon: string;
    common: string;
}

const ranks: i_rank = {
    gold: "text-[#FED700]",
    red: "text-[#EB4B4B]",
    pink: "text-[#D22CE6]",
    purple: "text-[#8846FF]",
    blue: "text-[#4B69FF]",
    uncommon: "text-[#5E98D7]",
    common: "text-[#B1C3D9]",
};

export function getColorClass(kd: string) {
    const kdValue = parseFloat(kd);

    if (kdValue < 1) {
        return 'text-red-300';
    } else if (kdValue >= 1 && kdValue < 2) {
        return 'text-yellow-300';
    } else if (kdValue >= 2) {
        return 'text-green-300';
    } else {
        return 'text-zinc-300'; // default color if none of the conditions are met
    }
}

function GetRatingColor(num: number) {
    let result: keyof i_rank = "common";

    if (num >= 0 && num <= 5000) {
        result = "common";
    } else if (num >= 5001 && num <= 12000) {
        result = "uncommon";
    } else if (num >= 12001 && num <= 20000) {
        result = "blue";
    } else if (num >= 20001 && num <= 35000) {
        result = "purple";
    } else if (num >= 35001 && num <= 50000) {
        result = "pink";
    } else if (num >= 50001 && num <= 70000) {
        result = "red";
    } else if (num >= 100000) {
        result = "gold";
    }
    return ranks[result]
}


function formatRating(number: number) {
    // Convert the number to a string
    const numberStr = number.toString();

    if (numberStr.length > 3) {
        // Split the string into two parts
        const integerPart = numberStr.slice(0, -3);
        const decimalPart = numberStr.slice(-3);
        return (
            <span>{integerPart}<small>,{decimalPart}</small></span>
        );
    } else {
        return (
            <span className='pl-1'><small>{numberStr}</small></span>
        )
    }
}

function GetRating(num: number) {
    let result: keyof i_rank = "common";

    if (num >= 0 && num <= 5000) {
        result = "common";
    } else if (num >= 5001 && num <= 12000) {
        result = "uncommon";
    } else if (num >= 12001 && num <= 20000) {
        result = "blue";
    } else if (num >= 20001 && num <= 35000) {
        result = "purple";
    } else if (num >= 35001 && num <= 50000) {
        result = "pink";
    } else if (num >= 50001 && num <= 70000) {
        result = "red";
    } else if (num >= 100000) {
        result = "gold";
    }

    return (
        <div
            className={`cs2rating ${ranks[result]}`}
            style={{ backgroundImage: `url(/img/rating/${result}.png)` }}
        >
            {formatRating(num)}
        </div>
    );
}

export function getColumns(): ColumnDef<ExtRank>[] {
    return [
        {
            accessorKey: "player_name",
            header: "Player Name",
            // cell: ({ row }) => <div className="w-20">{row.getValue("player_name")}</div>,
            cell: ({ row }: { row: { original: ExtRank } }) => (
                <div className="font-medium flex gap-3 items-center">
                    {/* <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger className="cursor-default">
                                <span className="relative flex h-2 w-2 items-center mr-1 ml-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="relative flex items-center h-2 w-2">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                                    </span>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Online</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
                    {/* <Avatar>
                        <AvatarImage src={row.original.player_avatar!} alt={row.original.player_name!} />
                        <AvatarFallback>{row.original.player_name}</AvatarFallback>
                    </Avatar> */}
                    <Link href={`https://steamcommunity.com/profiles/${row.original.player_steamid}`} target="_blank" passHref className="flex flex-col -ml-1">
                        <p className="truncate text-ellipsis max-w-36 group-hover:underline px-2 py-1 rounded-lg cursor-pointer">{row.original.player_name}</p>
                    </Link>
                </div>
            )
        },
        // {
        //     accessorKey: "rating",
        //     header: "Rating",
        //     cell: ({ row }) => {
        //         return (
        //             <div className='italic text-base'>
        //                 {GetRating(row.original.points)}
        //             </div>
        //         )
        //     },
        // },
        {
            accessorKey: "value",
            header: "Rank",
            cell: ({ row }) => {
                return (
                    <div>
                        <Image
                            src={`/img/ranks/${(row.original.rank - 1) < 1 ? '1' : row.original.rank - 1}.png`}
                            height={60}
                            width={60}
                            className='ml-1'
                            alt={`rank`}
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: "kd",
            header: "KD Ratio",
            cell: ({ row }) => {
                const color = getColorClass(row.original.kd)
                return <p className={color}>{row.original.kd}</p>
            },
        },
        {
            accessorKey: "kills",
            header: "Kills",
            cell: ({ row }) => {
                return <p>{row.original.kills}</p>
            },
        },
        {
            accessorKey: "headshots",
            header: "Headshots",
            cell: ({ row }) => {
                return <p>{row.original.headshots}</p>
            },
        },
        {
            accessorKey: "detahs",
            header: "Deaths",
            cell: ({ row }) => {
                return <p>{row.original.deaths}</p>
            },
        },
        {
            accessorKey: "assists",
            header: "Assists",
            cell: ({ row }) => {
                return <p>{row.original.deaths}</p>
            },
        },
        // {
        //     accessorKey: "wp",
        //     header: "Round Win(W, L)",
        //     cell: ({ row }) => {
        //         return <p>{row.original.wp}% (<span className="text-green-300">{row.original.round_win}</span>, <span className="text-red-300">{row.original.round_lose}</span>)</p>
        //     },
        // },
        {
            accessorKey: "playtime",
            header: "Playtime",
            cell: ({ row }) => {
                return <p>{(row.original.playtime / 3600).toFixed(2)} hrs</p>
            },
        },
        // {
        //     accessorKey: "lastconnect",
        //     header: () => <p className="text-right">Last Played</p>,
        //     cell: ({ row }) => {
        //         return <p className="text-muted-foreground text-sm font-normal text-right">
        //             {/* {player?.lastconnect} */}
        //             {format(row.original.lastconnect * 1000)}
        //         </p>
        //     },
        // },
    ]
}