import query from "@/lib/functions/db"
import ServerQuery, { SafeServerInfo } from "@/lib/functions/query/ServerQuery"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {

    const dbServers = await query.servers.getAll()

    const servers: (SafeServerInfo | null)[] = await Promise.all(
        dbServers.map(async (server) => {
            const { id: serverId } = server

            const serverInfo = await ServerQuery(serverId, true).catch((e) => {
                console.log(`Error while querying server: ${serverId}, error: ${e}`)
            })

            if (!serverInfo) return null

            return serverInfo
        })
    )

    const mappedServers = servers.filter((server) => server !== null)

    return Response.json(mappedServers)
}