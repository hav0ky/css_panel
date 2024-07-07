import { Badge } from "@/components/ui/badge"
import { ExtMute } from "@/server/mutes"

const Status = (value: ExtMute['status']) => {
    switch (value) {
        case 'ACTIVE':
            return (
                <Badge variant="destructive">{value}</Badge>
            )
        case 'EXPIRED':
            return (
                <Badge variant="secondary">{value}</Badge>
            )
        case 'UNMUTED':
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
