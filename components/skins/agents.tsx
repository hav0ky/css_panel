import { Agent } from "@/types/skins"
import axios from "axios"
import WeaponCard from "./card"
import useSWR from "swr"
import { Loader2 } from "lucide-react"
import fetcher from "@/lib/fetcher"

const AgentSkins = ({ steamid }: { steamid: string }) => {
    const { data, isLoading, error, mutate } = useSWR<any[]>(`/api/skins/agents`, fetcher)

    if (isLoading) {
        return (
            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
        )
    }

    if (error) {
        return (
            <p className="text-sm text-muted-foreground">Something went wrong :(</p>
        )
    }

    if (!data) return null

    return (
        <div className='flex flex-wrap gap-9 py-6'>
            {data.length > 0 ? (
                data.map((skin) => (
                    <WeaponCard
                        key={skin.model}
                        steamid={steamid}
                        skin={skin}
                        refetch={async () => { await mutate() }}
                        isSelected={
                            // data.some(
                            //     (selectedSkin) =>
                            //         selectedSkin.weapon_defindex === weaponIds[skin.weapon.id as unknown as keyof typeof weaponIds] &&
                            //         selectedSkin.weapon_paint_id == skin.paint_index
                            // )
                            false
                        }
                    />
                ))
            ) : (
                <p>No agents available.</p>
            )}
        </div>
    )
}

export default AgentSkins