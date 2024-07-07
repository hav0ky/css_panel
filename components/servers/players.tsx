
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { PlayerInfo } from "@/lib/functions/query/ServerQuery"
import { ScrollArea } from "@/components/ui/scroll-area"

export const get_players_by_team = (players: PlayerInfo[], t: number): PlayerInfo[] => {
    return players.filter(player => player.t === t);
};

export function calculateKDRatio(kills: number, deaths: number) {
    if (deaths === 0) {
        if (kills === 0) {
            return 0.00.toFixed(2); // If both kills and deaths are 0
        }
        return kills.toFixed(2); // If deaths are 0, KD ratio is equal to kills
    }

    return (kills / deaths).toFixed(2); // Normal KD ratio calculation
}

export default function PlayersTable({ players }: { players: PlayerInfo[] }) {

    const counter_terrorists = get_players_by_team(players, 1)
    const terrorists = get_players_by_team(players, 2)
    const t_score = terrorists.length > 0 ? terrorists[0].s : 0
    const ct_score = counter_terrorists.length > 0 ? counter_terrorists[0].s : 0
    const spectators = get_players_by_team(players, 0)

    return (
        <ScrollArea className="h-[200px] pt-4">
            <div className="grid grid-cols-3 text-center lg:px-32 pb-4 font-semibold text-2xl">
                <p className="bg-gradient-to-r from-transparent via-blue-500/30 to-transparent text-zinc-300">{ct_score}</p>
                <p>:</p>
                <p className="bg-gradient-to-r from-transparent via-orange-500/30 to-transparent text-zinc-300">{t_score}</p>
            </div>

            <Table>
                <TableBody>
                    <TableRow className="border-none">
                        <TableCell className="bg-gradient-to-r from-blue-500/30 to-transparent py-2 rounded-l-sm">
                            Counter-Terrorists
                        </TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">KD Ratio</TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">Kills</TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">Deaths</TableCell>
                    </TableRow>
                    {counter_terrorists.map(e =>
                        <TableRow key={e.id} className="border-none">
                            <TableCell>
                                <div className="font-medium flex gap-3 items-center">
                                    <Avatar>
                                        <AvatarImage src={e.avatar!} alt={e.playerName!} />
                                        <AvatarFallback>{e.playerName}</AvatarFallback>
                                    </Avatar>
                                    <Link href={`https://steamcommunity.com/profiles/${e.s64}`} target="_blank" passHref className="flex flex-col -ml-1">
                                        <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">{e.playerName}</p>
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{calculateKDRatio(Number(e.k), Number(e.d))}</TableCell>
                            <TableCell className="text-center">{e.k}</TableCell>
                            <TableCell className="text-center">{e.d}</TableCell>
                            {/* <TableCell className="text-right"><Button variant="outline" size="icon"><TriangleAlert size={18} /></Button></TableCell> */}
                        </TableRow>
                    )}
                    <TableRow className="border-none">
                        <TableCell className="bg-gradient-to-r from-orange-500/30 to-transparent py-2 rounded-l-sm">
                            Terrorists
                        </TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">KD Ratio</TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">Kills</TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">Deaths</TableCell>
                    </TableRow>
                    {terrorists.map(e =>
                        <TableRow key={e.id} className="border-none">
                            <TableCell>
                                <div className="font-medium flex gap-3 items-center">
                                    <Avatar>
                                        <AvatarImage src={e.avatar!} alt={e.playerName!} />
                                        <AvatarFallback>{e.playerName}</AvatarFallback>
                                    </Avatar>
                                    <Link href={`https://steamcommunity.com/profiles/${e.s64}`} target="_blank" passHref className="flex flex-col -ml-1">
                                        <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">{e.playerName}</p>
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{calculateKDRatio(Number(e.k), Number(e.d))}</TableCell>
                            <TableCell className="text-center">{e.k}</TableCell>
                            <TableCell className="text-center">{e.d}</TableCell>
                            {/* <TableCell className="text-right"><Button variant="outline" size="icon"><TriangleAlert size={18} /></Button></TableCell> */}
                        </TableRow>
                    )}
                    <TableRow className="border-none">
                        <TableCell className="bg-gradient-to-r from-zinc-500/30 to-transparent py-2 rounded-l-sm">
                            Spectators
                        </TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">KD Ratio</TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">Kills</TableCell>
                        <TableCell className="py-2 uppercase text-xs font-semibold text-muted-foreground text-center">Deaths</TableCell>
                    </TableRow>
                    {spectators.map(e =>
                        <TableRow key={e.id}>
                            <TableCell>
                                <div className="font-medium flex gap-3 items-center">
                                    <Avatar>
                                        <AvatarImage src={e.avatar!} alt={e.playerName!} />
                                        <AvatarFallback>{e.playerName}</AvatarFallback>
                                    </Avatar>
                                    <Link href={`https://steamcommunity.com/profiles/${e.s64}`} target="_blank" passHref className="flex flex-col -ml-1">
                                        <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">{e.playerName}</p>
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{calculateKDRatio(Number(e.k), Number(e.d))}</TableCell>
                            <TableCell className="text-center">{e.k}</TableCell>
                            <TableCell className="text-center">{e.d}</TableCell>
                            {/* <TableCell className="text-right"><Button variant="outline" size="icon"><TriangleAlert size={18} /></Button></TableCell> */}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}