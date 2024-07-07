import ApiStats from "@/lib/functions/query/Stats";
import StatsBox from "./box";
import { Ban, MicOff, Server, Shield, Users } from "lucide-react";

export default async function StatsPage() {
    const stats = await ApiStats()

    if (!stats) return null;

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 my-8">
            <StatsBox title="Mutes" value={stats.mutes} icon={MicOff} />
            <StatsBox title="Bans" value={stats.bans} icon={Ban} />
            <StatsBox title="Online Servers" value={stats.servers} icon={Server} />
            <StatsBox title="Total Players" value={stats.ranks} icon={Users} />
        </div>
    )
}