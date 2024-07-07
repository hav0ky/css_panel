
import query from './db'

const isAdmin = async (steamid: string) => {
	const admin = await query.admins.getBySteam64(steamid)
	return !!admin
}

export default isAdmin
