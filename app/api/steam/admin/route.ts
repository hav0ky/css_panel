import { validateRequest } from "@/lib/auth";
import isAdmin from "@/lib/functions/isAdmin";

export async function GET(request: Request) {
    try {
        const { user } = await validateRequest()
        if (!user) {
            return Response.json({
                message: "Not Found"
            }, { status: 404 })
        }

        const is_admin = await isAdmin(user.id)

        if (!is_admin) {
            return Response.json({
                message: "Not Found"
            }, { status: 404 })
        }

        return Response.json({
            is_admin: true
        })
    } catch (error) {
        return Response.json({
            message: "Something went wrong :("
        }, {
            status: 500
        })
    }
}