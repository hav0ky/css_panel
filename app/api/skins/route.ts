import query from "@/lib/functions/db";
import db from "@/lib/mysql";
import { weaponIds } from "@/types/skins";
import { RowDataPacket } from "mysql2";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const steamid = request.nextUrl.searchParams.get('steamid')
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM wp_player_skins WHERE steamid = ?', [steamid]);
        return Response.json(rows)
    } catch (error) {
        return Response.json({ message: "Not Found" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { steamid, weapon_id, paint_index } = await request.json()
        const response = await query.skins.change_skin(steamid, weaponIds[weapon_id as unknown as keyof typeof weaponIds], Number(paint_index))
        return Response.json({ message: response })
    } catch (error) {
        return Response.json({ message: "Not Found" }, { status: 500 })
    }
}