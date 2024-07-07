import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

// import { updateTask } from "../_lib/actions"
// import { getPriorityIcon, getStatusIcon } from "../_lib/utils"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"
// import { UpdateTaskSheet } from "./update-task-sheet"
import { MoreHorizontal, ShieldBan } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import Status from "./status"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ExtMute, UnmuteUser } from "@/server/mutes"
import { Button } from "@/components/ui/button"

export function getColumns({ is_admin }: { is_admin: boolean }): ColumnDef<ExtMute>[] {
    return [
        {
            accessorKey: "player_name",
            header: "Player Name",
            // cell: ({ row }) => <div className="w-20">{row.getValue("player_name")}</div>,
            cell: ({ row }: { row: { original: ExtMute } }) => (
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
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                return <Badge variant="warning">{row.original.type}</Badge>
            },
        },
        {
            accessorKey: "admin",
            header: "Admin",
            cell: ({ row }: { row: { original: ExtMute } }) => {
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
            cell: ({ row }: { row: { original: ExtMute } }) => {
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
                                {row.original.status == 'ACTIVE' &&
                                    <form action={() => UnmuteUser(row.original.id, 'test')}>
                                        <Button type="submit" size="sm" variant="destructive">
                                            Unmute
                                        </Button>
                                    </form>
                                }
                            </div>
                        }
                    </div>
                )
            },
        },
        {
            accessorKey: "timeleft",
            header: () => <p className="text-right">Time Left</p>,
            cell: ({ row }: { row: { original: ExtMute } }) => {
                const duration = row.original.duration
                if (duration === 0) {
                    return (
                        <Badge variant="warning">
                            Permanent
                        </Badge>
                    )
                }

                if (row.original.status === 'UNMUTED' || row.original.status === 'EXPIRED')
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
    ]
}