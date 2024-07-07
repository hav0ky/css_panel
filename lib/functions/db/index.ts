import Servers from './Servers'
import Bans from './Bans'
import Mutes from './Mutes'
import Admins from './Admins'
import AdminGroups from './AdminGroups'
import ChatLogs from './ChatLogs'
import Ranks from './Ranks'
import Users from './Users'
import Skins from './Skins'

const query = {
	servers: Servers,
	admins: Admins,
	adminGroups: AdminGroups,
	bans: Bans,
	mutes: Mutes,
	chatLogs: ChatLogs,
	ranks: Ranks,
	users: Users,
	skins: Skins
}

export default query
