"use server"
import GetSteamUsers from "@/lib/functions/GetSteamUsers"
import query from "@/lib/functions/db"
import { SA_Mute } from "@/types/db/plugin"

export const GetMutes = async (page: number, rows: number) => {
    // const { page, rows } = queryParamsSchema.parse(req.query)

    // const isUserAdmin = await isAdmin(req)
    // const showAdminName = await query.settings.getByKey('showAdminName', false)
    const shouldShowAdminName = true

    const dbMutes = await query.mutes.getAll(page, rows)
    const count = await query.mutes.count()

    const filteredSteams = [
        ...dbMutes.map((mute) => mute.player_steamid),
        ...dbMutes.map((mute) => mute.admin_steamid),
    ].filter((steamid): steamid is string => !!steamid)

    const steams = await GetSteamUsers(filteredSteams)

    const mutes: (ExtMute | null)[] = await Promise.all(
        dbMutes.map(async (mute) => {
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
                type,
                comment,
                unmute_reason,
            } = mute

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
                unmute_reason: unmute_reason,
                type,
            }
        })
    )

    const mappedMutes: ExtMute[] = mutes.filter((mute) => !!mute) as ExtMute[]

    return { data: mappedMutes, count: count }
}

export const UnmuteUser = async (banId: number, reason: string) => {
    const res = await query.mutes.update(Number(banId), { status: 'UNMUTED', unmute_reason: reason })
}

export const MuteUser = async (player_name: string, player_steamid: string, duration: number, reason: string, type: SA_Mute['type'], comment: string, admin_steamid: string, admin_name: string) => {

    const created = new Date()
    const ends = new Date(created.getTime() + Number(duration) * 60 * 1000)

    await query.mutes.create({
        player_name,
        player_steamid,
        reason,
        duration: Number(duration),
        comment,
        admin_steamid,
        admin_name,
        created,
        ends,
        type
    })
}

export interface ExtMute {
    id: SA_Mute['id']
    admin_name: SA_Mute['admin_name'] | null
    admin_steamid: SA_Mute['admin_steamid'] | null
    admin_avatar: string | null
    created: SA_Mute['created']
    duration: SA_Mute['duration']
    ends: SA_Mute['ends']
    reason: SA_Mute['reason']
    status: SA_Mute['status']
    player_name: SA_Mute['player_name']
    player_steamid: SA_Mute['player_steamid']
    player_avatar: string | null
    server_id: SA_Mute['server_id']
    type: SA_Mute['type']
    comment: SA_Mute['comment'] | null
    unmute_reason: SA_Mute['unmute_reason'] | null
}

export interface API_MUTES {
    results: ExtMute[]
    count: number
}