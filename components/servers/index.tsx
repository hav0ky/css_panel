import fetcher from '@/lib/fetcher'
import { SafeServerInfo } from '@/lib/functions/query/ServerQuery'
import useSWR from 'swr'
import ServerCard from './card'
import query from '@/lib/functions/db'

const ServersTable = async () => {
    const servers = await query.servers.getAllSafe()
    // const { data, isLoading, error } = useSWR<SafeServerInfo[]>('/api/servers', fetcher)

    // if (!data) return null;

    // if (isLoading) return <p>Loading ...</p>

    // console.log(data)
    // return (
    //     <div>
    //         hello
    //     </div>
    // )
    return (
        <div className="grid gap-4 grid-cols-1 md:gap-8 xl:grid-cols-2 my-8">
            {servers.map(e =>
                <div key={e.id} >
                    <ServerCard serverId={e.id} />
                </div>
            )}
        </div>
    )
}

export default ServersTable