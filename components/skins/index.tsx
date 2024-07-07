"use client"
import { Skin } from "@/types/skins"
import { ensureCategoryDefaults, groupAndSortSkins } from "./sort";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WeaponSkins from "./weapons";
import { useSession } from "@/app/provider";
import AgentSkins from "./agents";

const SkinsTab = ({ data }: { data: Skin[] }) => {
    const { user } = useSession()

    if (!user) {
        return (
            <p>Since the user is not signed in, they need to sign in to access the skin changer.</p>
        )
    }
    const skins = ensureCategoryDefaults(data)
    return (
        // <Tabs defaultValue="weapons">
        //     <TabsList>
        //         <TabsTrigger value="weapons">Weapon Skins</TabsTrigger>
        //         <TabsTrigger value="agents">Agents</TabsTrigger>
        //         <TabsTrigger value="music">Music Kits</TabsTrigger>
        //     </TabsList>
        //     <TabsContent value="weapons">
        <WeaponSkins skins={skins} steamid={user.id} />
        //         </TabsContent>
        //     <TabsContent value="agents">Work in Progress.</TabsContent>
        //     <TabsContent value="music">Work in Progress.</TabsContent>
        // </Tabs>

    )
}

export default SkinsTab