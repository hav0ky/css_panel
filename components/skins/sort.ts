import db from "@/lib/mysql";
import { Skin } from "@/types/skins";
import { RowDataPacket } from "mysql2";

export function ensureCategoryDefaults(skins: Skin[]): Skin[] {
    return skins.map(skin => {
        if (!skin.category) {
            skin.category = { id: 'csgo_inventory_weapon_category_zeus', name: 'Zeus' };
        } else {
            skin.category.id = skin.category.id || 'csgo_inventory_weapon_category_zeus';
            skin.category.name = skin.category.name || 'Zeus';
        }
        return skin;
    });
}

export function groupAndSortSkins(skins: Skin[]): Record<string, Record<string, Skin[]>> {
    const groupedSkins: Record<string, Record<string, Skin[]>> = {};

    skins.forEach((skin) => {
        const category = skin.category.id;
        const weapon = skin.weapon.id;

        if (!groupedSkins[category]) {
            groupedSkins[category] = {};
        }

        if (!groupedSkins[category][weapon]) {
            groupedSkins[category][weapon] = [];
        }

        groupedSkins[category][weapon].push(skin);
    });

    Object.keys(groupedSkins).forEach((category) => {
        Object.keys(groupedSkins[category]).forEach((weapon) => {
            groupedSkins[category][weapon].sort((a, b) => a.name.localeCompare(b.name));
        });
    });

    return groupedSkins;
}