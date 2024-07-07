'use client';

import { useEffect, useState } from 'react';
import { Skin, weaponIds } from '@/types/skins';
import { groupAndSortSkins } from './sort';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2, LucideProps, Rabbit, Settings } from 'lucide-react';
import Image from 'next/image';
import WeaponCard from './card';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { Icons } from '../ui/icons';

interface WeaponSkinsProps {
    skins: Skin[];
    steamid: string;
}

const categoryIcons: { [key: string]: React.ComponentType<LucideProps> } = {
    csgo_inventory_weapon_category_pistols: Icons.weapon_deagle,
    csgo_inventory_weapon_category_rifles: Icons.weapon_ak47,
    csgo_inventory_weapon_category_smgs: Icons.weapon_mac10,
    csgo_inventory_weapon_category_heavy: Icons.weapon_negev,
    csgo_inventory_weapon_category_zeus: () => <Settings className='size-4' />,
    sfui_invpanel_filter_melee: Icons.weapon_knife_karambit,
    sfui_invpanel_filter_gloves: Icons.weapon_gloves
    // Add more mappings as needed...
};

const WeaponSkins = ({
    skins,
    steamid
}: WeaponSkinsProps) => {

    const [category, setCategory] = useState<string>('csgo_inventory_weapon_category_pistols');
    const [weapon, setWeapon] = useState<string>('weapon_deagle');
    const { data, isLoading, error, mutate } = useSWR<any[]>(`/api/skins?steamid=${steamid}`, fetcher)

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
    // console.log(data)
    const groupedSkins = groupAndSortSkins(skins);

    const handleCategoryChange = (category: string) => {
        setCategory(category);
        setWeapon(''); // Reset weapon when category changes
    };

    const handleWeaponChange = (weapon: string) => {
        setWeapon(weapon);
    };

    const availableWeapons = category ? Object.keys(groupedSkins[category]) : [];

    const filteredSkins = category && weapon ? groupedSkins[category][weapon] : [];

    return (
        <div id='skins-container'>
            <div className='grid grid-cols-2 gap-3'>
                {/* Category Select */}
                <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger id='category'>
                        <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(groupedSkins).map((category) => {
                            return (
                                <SelectItem key={category} value={category}>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Settings className='size-4' />
                                        <div className="grid gap-0.5">
                                            <p>
                                                Category{' '}
                                                <span className="font-medium text-foreground">
                                                    {skins.find(
                                                        (skin) => skin.category.id === category
                                                    )?.category.name ?? category}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                {/* Weapon Select */}
                {category && (
                    <Select value={weapon} onValueChange={handleWeaponChange}>
                        <SelectTrigger id='weapon' className='items-start'>
                            <SelectValue placeholder='Select a weapon' />
                        </SelectTrigger>
                        <SelectContent>
                            {availableWeapons.map((weapon) => (
                                <SelectItem key={weapon} value={weapon}>
                                    <div className='flex items-start gap-3 text-muted-foreground'>
                                        <Settings className='size-4' />
                                        <div className='grid gap-0.5'>
                                            <p>
                                                Weapon{' '}
                                                <span className='font-medium text-foreground'>
                                                    {skins.find(
                                                        (skin) => skin.weapon.id === Number(weapon)
                                                    )?.weapon.name ?? weapon}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Display the filtered skins */}
            <div className='flex flex-wrap gap-9 py-6'>
                {filteredSkins.length > 0 ? (
                    filteredSkins.map((skin) => (
                        <WeaponCard
                            key={skin.id}
                            steamid={steamid}
                            skin={skin}
                            refetch={async () => { await mutate() }}
                            isSelected={
                                data.some(
                                    (selectedSkin) =>
                                        selectedSkin.weapon_defindex === weaponIds[skin.weapon.id as unknown as keyof typeof weaponIds] &&
                                        selectedSkin.weapon_paint_id == skin.paint_index
                                )
                            }
                        />
                    ))
                ) : (
                    <p>No skins available for the selected category and weapon.</p>
                )}
            </div>
        </div>
    );
};

export default WeaponSkins;
