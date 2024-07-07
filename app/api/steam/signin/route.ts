import { steamRedirect } from "@/server/steam";

export async function GET(request: Request) {
    const redirect_url = await steamRedirect()
    return Response.json({ url: redirect_url })
}
