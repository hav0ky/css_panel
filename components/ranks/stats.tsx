
import StatsBox from "../stats/box";
import { Ban, Medal, MicOff, Server, Shield, Trophy, UserPlus, Users } from "lucide-react";
import RankStats from "@/lib/functions/query/RankStats";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import TopPlayerCard from "./top-player";

export default async function RanksStatsPage() {
    const stats = await RankStats()

    if (!stats) return null;

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 my-8">
            <TopPlayerCard player={stats.top} />
            <StatsBox title="Recent Players" value={stats.recent} icon={UserPlus} />
            <StatsBox title="Season" value={1} icon={Trophy} />
            <StatsBox title="Total Players" value={stats.total} icon={Users} />
            {/* <StatsBox title="Online Servers" value={stats.servers} icon={Server} />
            <StatsBox title="Admins" value={stats.admins} icon={Shield} /> */}
        </div>
    )
}