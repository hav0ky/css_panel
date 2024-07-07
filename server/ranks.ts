import GetSteamUsers from "@/lib/functions/GetSteamUsers";
import query from "@/lib/functions/db";
import { SA_Rank } from "@/types/db/plugin"
import { SteamIDToSteam64 } from "steam-api-sdk"

function calculateKDRatio(kills: number, deaths: number) {
    if (deaths === 0) {
        if (kills === 0) {
            return 0.00.toFixed(2); // If both kills and deaths are 0
        }
        return kills.toFixed(2); // If deaths are 0, KD ratio is equal to kills
    }

    return (kills / deaths).toFixed(2); // Normal KD ratio calculation
}

export const GetRanks = async (page: number, rows: number) => {
    // const { page, rows } = queryParamsSchema.parse(req.query)

    // const isUserAdmin = await isAdmin(req)
    // const showAdminName = await query.settings.getByKey('showAdminName', false)
    const shouldShowAdminName = true

    let dbRanks = await query.ranks.getAll(page, rows)
    const count = await query.ranks.count()

    dbRanks = dbRanks.map((rank) => {
        const steam64Id = SteamIDToSteam64(rank.steam);
        return {
            ...rank,
            steam: typeof steam64Id === 'string' ? steam64Id : rank.steam // Use steam64Id if it's a string, otherwise keep original steam
        };
    })

    const filteredSteams = [
        ...dbRanks.map((rank) => rank.steam)
    ].filter((steam): steam is string => !!steam)

    const steams = await GetSteamUsers(filteredSteams)

    const ranks: (ExtRank | null)[] = await Promise.all(
        dbRanks.map(async (irank) => {
            const {
                steam,
                name,
                value,
                rank,
                kills,
                deaths,
                shoots,
                hits,
                headshots,
                assists,
                round_win,
                round_lose,
                playtime,
                lastconnect
            } = irank

            return {
                id: steam,
                player_name: name,
                player_steamid: steam,
                player_avatar: steams.find((e) => e.steamid === steam)?.avatar || null,
                points: value,
                rank,
                kills,
                deaths,
                shoots,
                kd: calculateKDRatio(kills, deaths),
                wp: calculateKDRatio(round_win, round_lose),
                hits,
                headshots,
                assists,
                round_win,
                round_lose,
                playtime,
                lastconnect
            }
        })
    )

    const mappedRanks: ExtRank[] = ranks.filter((rank) => !!rank) as ExtRank[]

    return { data: mappedRanks, count: count }
}

export interface ExtRank {
    id: SA_Rank['steam']
    player_name: SA_Rank['name']
    player_steamid: SA_Rank['steam']
    player_avatar: string | null
    points: SA_Rank['value']
    kd: string
    wp: string
    rank: SA_Rank['rank']
    kills: SA_Rank['kills']
    deaths: SA_Rank['deaths']
    shoots: SA_Rank['shoots']
    hits: SA_Rank['hits']
    headshots: SA_Rank['headshots']
    assists: SA_Rank['assists']
    round_win: SA_Rank['round_win']
    round_lose: SA_Rank['round_lose']
    playtime: SA_Rank['playtime']
    lastconnect: SA_Rank['lastconnect']
}

export interface API_RANKS {
    results: ExtRank[]
    count: number
}