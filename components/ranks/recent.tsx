import { GetBans } from "@/server/bans";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { GetRanks } from "@/server/ranks";

export default async function TopPlayers() {
    const get_bans = await GetRanks(1, 10)
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Top Players</CardTitle>
                    <CardDescription>
                        List of top players.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/ranks">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Player Name</TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead>
                                Date / Time
                            </TableHead>
                            <TableHead className="text-right">Time Left</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {get_bans.data.map(ban =>
                            <TableRow key={ban.id}>
                                <TableCell>
                                    <div className="font-medium flex gap-3 items-center">
                                        <Avatar>
                                            <AvatarImage src={ban.player_avatar!} alt={ban.player_name!} />
                                            <AvatarFallback>{ban.player_name}</AvatarFallback>
                                        </Avatar>
                                        <Link href={`https://steamcommunity.com/profiles/${ban.player_steamid}`} target="_blank" passHref className="flex flex-col -ml-1">
                                            <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">{ban.player_name}</p>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell className="text-right">
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}