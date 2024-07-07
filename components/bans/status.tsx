import { ExtBan } from "@/app/api/bans/route"
import { Badge } from "../ui/badge"

const Status = (value: ExtBan['status']) => {
    switch (value) {
        case 'ACTIVE':
            return (
                <Badge variant="destructive">{value}</Badge>
            )
        case 'EXPIRED':
            return (
                <Badge variant="secondary">{value}</Badge>
            )
        case 'UNBANNED':
            return (
                <Badge variant="default">{value}</Badge>
            )
        default:
            return (
                <Badge variant="outline">{value}</Badge>
            )
    }
}

export default Status
