import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Medal } from "lucide-react"

export default function TopPlayerCard({ player }: { player: { name: string, avatar: string, steamid: string, rank: number } }) {
    return (
        <Card className='hover:bg-zinc-100/5 cursor-default transform-gpu transition-all duration-300 ease-in-out'>
            <CardContent className='flex flex-row justify-between items-center px-6 py-4'>
                <div className='flex flex-col'>
                    <span className='bg-gradient-to-tr flex gap-2 from-purple-300 to-primary text-transparent bg-clip-text font-bold text-2xl w-fit'>
                        <Link href={`https://steamcommunity.com/profiles/${player.steamid}`} target="_blank" passHref className="flex flex-col -ml-1">
                            <p className="truncate text-ellipsis max-w-36 group-hover:bg-primary/90 px-2 py-1 rounded-lg cursor-pointer">{player.name}</p>
                        </Link>
                    </span>
                    <span className='text-foreground text-sm'>Top Player</span>
                </div>
                <Medal
                    size={30}
                    className='text-foreground'
                />
            </CardContent>
        </Card>
    )
}