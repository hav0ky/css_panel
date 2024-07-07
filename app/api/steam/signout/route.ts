import { steamInvalidate } from "@/server/steam";

export async function GET(request: Request) {
    const message = await steamInvalidate()
    return Response.json({ message })
}
