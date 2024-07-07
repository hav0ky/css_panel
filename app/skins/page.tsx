import Link from "next/link"
import { ContentLayout } from "@/components/panel/content-layout"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SkinsTab from "@/components/skins"
import { Skin } from "@/types/skins"
import Image from "next/image"

export default async function SkinsPage() {
    const res = await fetch('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json', { cache: 'no-cache' })
    const data: Skin[] = await res.json()

    return (
        <ContentLayout title="">
            {/* <div>
                <Image
                    src={`https://raw.githubusercontent.com/ByMykel/CSGO-API/1675e7262bd51fdba1d74664fd4b4fc06a50bb12/public/images/econ/default_generated/weapon_taser_zeus_thunder_god_light.png`}
                    height={150}
                    width={150}
                    alt="weapon"
                />
                <div className="text-sm">
                    <p className="truncate font-medium text-muted-foreground">Zeus</p>
                    <p className="truncate">Zeus | qiuawbc aa asdka</p>
                </div>
            </div> */}
            <SkinsTab data={data} />
        </ContentLayout >
    )
}