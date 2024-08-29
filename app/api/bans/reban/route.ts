import query from "@/lib/functions/db"

export async function POST(request: Request) {
    try {
        const { banId, duration, reason } = await request.json()

        const created = new Date()
        const ends = new Date(Date.now() + Number(duration) * 60000)

        await query.bans.update(Number(banId), {
            status: 'ACTIVE',
            reason,
            created,
            ends,
            duration: Number(duration),
            // admin_name: isAdmin.player_name,
            // admin_steamid: isAdmin.player_steamid,
            unban_reason: null,
        })

        return Response.json({ message: 'success' })

    } catch (error) {
        return Response.json({ error }, { status: 404 })
    }
}