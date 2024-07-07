import query from '../db'

/**
 * Get the stats from database**
 * - Using the custom plugin that made for the panel
 */
const ApiStats = async (): Promise<ApiStats | null> => {
    try {
        const servers = await query.servers.count()
        const ranks = await query.ranks.count()
        const bans = await query.bans.count()
        const mutes = await query.mutes.count()

        return {
            ranks,
            servers,
            bans,
            mutes,
        }
    } catch (e) {
        console.log('error')
        return null
    }
}

export interface ApiStats {
    servers: number
    ranks: number
    bans: number
    mutes: number
}

export default ApiStats