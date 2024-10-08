import GetSteamUsers from "@/lib/functions/GetSteamUsers"
import query from "@/lib/functions/db"
import queryParamsSchema from "@/lib/schemas/queryParams"
import { SA_Ban } from "@/types/db/plugin"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const search = request.nextUrl.searchParams
        // const { page, rows } = queryParamsSchema.parse(request.nextUrl.searchParams.)
        const page = search.get('page')
        const rows = search.get('rows')

        const shouldShowAdminName = true

        const dbBans = await query.bans.getAll(Number(page || 0), Number(rows || 10))
        const count = await query.bans.count()

        const filteredSteams = [
            ...dbBans.map((ban) => ban.player_steamid),
            ...dbBans.map((ban) => ban.admin_steamid),
        ].filter((steamid): steamid is string => !!steamid)

        const steams = await GetSteamUsers(filteredSteams)

        const bans: (ExtBan | null)[] = await Promise.all(
            dbBans.map(async (ban) => {
                const {
                    admin_name,
                    admin_steamid,
                    created,
                    duration,
                    ends,
                    id,
                    reason,
                    status,
                    player_name,
                    player_steamid,
                    server_id,
                    comment,
                    unban_reason,
                    player_ip,
                } = ban

                return {
                    admin_name: shouldShowAdminName ? admin_name : null,
                    admin_steamid: shouldShowAdminName ? admin_steamid : null,
                    admin_avatar: steams.find((steam) => steam.steamid === admin_steamid)?.avatar || null,
                    created,
                    duration,
                    ends,
                    id,
                    reason,
                    status,
                    player_name,
                    player_steamid,
                    player_avatar: steams.find((steam) => steam.steamid === player_steamid)?.avatar || null,
                    server_id,
                    comment: comment,
                    unban_reason: unban_reason,
                    player_ip,
                }
            })
        )

        const mappedBans: ExtBan[] = bans.filter((ban) => !!ban) as ExtBan[]

        return Response.json({ data: mappedBans, count: count })
    } catch (error) {
        return Response.json({ error }, { status: 404 })
    }
}

export async function POST(request: Request) {
    try {
        const { player_name, player_steamid, duration, reason, comment, admin_steamid, admin_name } = await request.json()

        const created = new Date()
        const ends = new Date(created.getTime() + Number(duration) * 60 * 1000)

        await query.bans.create({
            player_name,
            player_steamid,
            player_ip: null,
            reason,
            duration: Number(duration),
            comment,
            admin_steamid,
            admin_name,
            created,
            ends,
        })

        return Response.json({ message: 'success' })

    } catch (error) {
        return Response.json({ error }, { status: 404 })
    }
}

export async function PUT(request: Request) {
    try {
        const { banId, reason } = await request.json()

        await query.bans.update(Number(banId), { status: 'UNBANNED', unban_reason: reason })
        return Response.json({ message: 'success' })

    } catch (error) {
        return Response.json({ error }, { status: 404 })
    }
}

export interface ExtBan {
    admin_name: SA_Ban['admin_name'] | null
    admin_steamid: SA_Ban['admin_steamid'] | null
    admin_avatar: string | null
    created: SA_Ban['created']
    duration: SA_Ban['duration']
    ends: SA_Ban['ends']
    id: SA_Ban['id']
    reason: SA_Ban['reason']
    status: SA_Ban['status']
    player_name: SA_Ban['player_name']
    player_steamid: SA_Ban['player_steamid']
    player_avatar: string | null
    server_id: SA_Ban['server_id']
    comment: SA_Ban['comment'] | null
    unban_reason: SA_Ban['unban_reason'] | null
    player_ip: SA_Ban['player_ip'] | null
}

export interface API_BANS {
    results: ExtBan[]
    count: number
}