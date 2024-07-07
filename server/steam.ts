import query from "@/lib/functions/db";
import steamauth from "@/lib/steam";
import { lucia, validateRequest } from "@/lib/auth";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const steamRedirect = async () => {
    const redirect_url = await steamauth.getRedirectUrl();
    return redirect_url
}

export const steamAuthenticate = async (request: Request, ip: string) => {
    const user = await steamauth.authenticate(request);

    const existing_user = await query.users.getById(user.steamid)

    if (!existing_user) {
        await query.users.create({ id: user.steamid, player_name: user.username, player_avatar: user.avatar.medium, ip })
    }

    const session = await lucia.createSession(user.steamid, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function steamInvalidate(): Promise<string> {
    const { session } = await validateRequest();
    if (!session) {
        return "unauthorized"
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return "success"
}