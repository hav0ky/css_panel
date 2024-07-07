import query from "@/lib/functions/db"
import ServerQuery, { SafeServerInfo } from "@/lib/functions/query/ServerQuery"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(
    request: Request,
    { params }: { params: { id: number } }
) {

    try {
        const dbServer = await query.servers.getById(params.id)
        if (!dbServer) return Response.json({ error: 'Server not found' }, { status: 404 })

        // const isAdmin = request.user?.id ? !!(await query.admins.getBySteam64(req.user?.id)) : false

        const serverInfo = await ServerQuery(params.id, true)

        return Response.json(serverInfo, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({ error }, { status: 500 })
    }
}