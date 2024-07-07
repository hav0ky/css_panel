import { Skin, weaponIds } from "@/types/skins"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { useTransition } from "react"
import { GetBans } from "@/server/bans"
import { toast } from "sonner"
import query from "@/lib/functions/db"
import { cn } from "@/lib/utils"
import next_axios from "@/lib/axios"

const WeaponCard = ({ skin, steamid, isSelected, refetch }: { skin: Skin, steamid: string, isSelected: boolean, refetch: () => Promise<void> }) => {

    // console.log(isSelected)
    async function onSubmit() {
        if (isSelected) return;
        // startUpdateTransition(() => {
        toast.promise(
            next_axios.post('/api/skins', { steamid, weapon_id: skin.weapon.id, paint_index: skin.paint_index }),
            {
                loading: "Updating...",
                success: async () => {
                    await refetch()
                    return "Skin updated"
                },
                error: "Error occured",
            }
        )
        // })
    }

    return (
        <Card key={skin.id} className={cn("max-w-[190px] transition-all duration-100 ease-in-out transform-gpu", isSelected ? "border border-primary cursor-default" : "cursor-pointer active:scale-[0.98]")} onClick={onSubmit}>
            <CardContent className="pt-5">
                <Image
                    src={skin.image}
                    height={150}
                    width={150}
                    className="mx-auto"
                    priority
                    alt={skin.name}
                />
            </CardContent>
            <CardFooter className="text-sm flex flex-col">
                <p className="truncate font-medium text-muted-foreground">{skin.category.name}</p>
                <p className="truncate">{skin.name}</p>
            </CardFooter>
        </Card>
    )
}

export default WeaponCard