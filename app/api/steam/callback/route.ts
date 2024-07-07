import { steamAuthenticate } from "@/server/steam";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(/, /)[0]
    await steamAuthenticate(request, ip!)

    return NextResponse.redirect(`${process.env.DOMAIN}/`)
}
