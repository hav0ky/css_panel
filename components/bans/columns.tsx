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
// import { ExtBan, RebanUser, UnbanUser } from "@/server/bans"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import Status from "./status"
import { Progress } from "@/components/ui/progress"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ExtBan } from "@/app/api/bans/route"

export function getColumns({ is_admin }: { is_admin: boolean }): ColumnDef<ExtBan>[] {

    return [
        {
            accessorKey: "player_name",
            header: "Player Name",
            // cell: ({ row }) => <div className="w-20">{row.getValue("player_name")}</div>,
            cell: ({ row }: { row: { original: ExtBan } }) => (
                <div className="font-medium flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src={row.original.player_avatar!} alt={row.original.player_name!} />
                        <AvatarFallback>{row.original.player_name}</AvatarFallback>
                    </Avatar>
                    <Link href={`https://steamcommunity.com/profiles/${row.original.player_steamid}`} target="_blank" passHref className="flex flex-col -ml-1">
                        <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">{row.original.player_name}</p>
                    </Link>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return Status(row.getValue("status"))
            },
        },
        {
            accessorKey: "admin",
            header: "Admin",
            cell: ({ row }: { row: { original: ExtBan } }) => {
                return row.original.admin_name ? (
                    row.original.admin_name === 'Console' ? (
                        <Badge variant="destructive">Console</Badge>
                    ) : (
                        <div className="font-medium flex gap-3 items-center">
                            {/* <Avatar>
                                <AvatarImage src={row.original.admin_avatar!} alt={row.original.admin_name!} />
                                <AvatarFallback>{row.original.admin_name}</AvatarFallback>
                            </Avatar> */}
                            <ShieldBan size={18} className="text-red-300" />
                            <Link href={`https://steamcommunity.com/profiles/${row.original.admin_steamid}`} target="_blank" passHref className="flex flex-col -ml-2">
                                <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 py-1 rounded-lg cursor-pointer">{row.original.admin_name}</p>
                            </Link>
                        </div>
                    )
                ) : (
                    <>-</>
                )
            },
        },
        {
            accessorKey: "reason",
            header: "Reason",
            cell: ({ row }) => {
                return row.original.reason.length > 10 ? (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>{row.original.reason.slice(0, 10)}</TooltipTrigger>
                            <TooltipContent>
                                <p>{row.original.reason}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <p>{row.original.reason}</p>
                )
            },
        },
        {
            accessorKey: "created",
            header: "Date",
            cell: ({ row }: { row: { original: ExtBan } }) => {
                return (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/90 px-2 py-0.5 rounded-sm">
                                {row.original.created.toLocaleDateString()}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{row.original.created.toString()}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            },
        },
        {
            accessorKey: "duration",
            header: "Duration",
            cell: ({ row }) => {
                const duration = row.getValue("duration")
                return (
                    <div className="flex gap-1">
                        <Badge variant="warning">{duration === 0 ? 'Permanent' : `${duration} minutes`}</Badge>
                        {is_admin &&
                            <div className="flex justify-end">
                                {/* {row.original.status == 'ACTIVE' ?
                                    <form action={() => UnbanUser(row.original.id, 'test')}>
                                        <Button type="submit" size="sm" variant="destructive">
                                            Unban
                                        </Button>
                                    </form>
                                    :
                                    <form action={() => RebanUser(row.original.id, row.original.duration, row.original.reason)}>
                                        <Button type="submit" size="sm" variant="destructive">
                                            Reban
                                        </Button>
                                    </form>
                                } */}
                            </div>
                        }
                    </div>
                )
            },
        },
        {
            accessorKey: "timeleft",
            header: () => <p className="text-right">Time left</p>,
            cell: ({ row }: { row: { original: ExtBan } }) => {
                const duration = row.original.duration
                if (duration === 0) {
                    return (
                        <div className="flex justify-end">
                            <Badge variant="warning">
                                Permanent
                            </Badge>
                        </div>
                    )
                }

                if (row.original.status === 'UNBANNED' || row.original.status === 'EXPIRED')
                    return (
                        <div className="flex justify-end">
                            <Progress value={100} />
                        </div>
                    )

                const currentDate = new Date()
                const startDate = new Date(row.original.created)
                const endDate = new Date(row.original.ends)
                const percentage = Math.round(
                    ((currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100
                )

                const minutesLeft = Math.round((endDate.getTime() - currentDate.getTime()) / 60000)

                return minutesLeft > 0 ? (
                    // <Tooltip
                    //     content={`${minutesLeft} minutes left`}
                    //     color={color}
                    //     showArrow
                    // >
                    <div className="flex flex-col justify-end">
                        {/* <Gauge value={percentage} size="small" showValue color={color} /> */}
                        <Progress value={percentage} />
                        <p className="pt-1 text-xs text-muted-foreground">{minutesLeft} minutes left</p>
                    </div>

                    // </Tooltip>
                ) : (
                    <div className="flex justify-end">
                        <Progress value={percentage} />
                    </div>
                    // <Progress
                    //     value={percentage}
                    // />
                )
            },
        },
        {
            accessorKey: "actions",
            header: () => <p className="text-right"></p>,
            cell: ({ row }: { row: { original: ExtBan } }) => {
                const duration = row.original.duration
                return (
                    <div className="flex justify-end">
                        {/* <ConfirmationDialog
                        open={rowIndex === i}
                        onOpenChange={(open) => setRowIndex(open ? i : null)}
                        title="Are you sure you want to delete this rule?"
                        text="This action cannot be undone."
                        onAction={handleDelete}
                    /> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>
                                    Copy Steam Id
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Unban
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                // onSelect={() => setRowIndex(i)}
                                >
                                    Reban
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <div className="flex justify-end">
                        <Badge variant="warning">
                            Permanent
                        </Badge>
                    </div> */}
                    </div>
                )
            },
        },
    ]
}