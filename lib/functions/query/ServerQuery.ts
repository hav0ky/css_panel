import type { SA_Admin, SA_ChatLog } from '@/types/db/plugin'
// import { From64ToUser } from 'steam-api-sdk'
import PluginStatus from './PluginStatus'
import query from '../db'
import GetServerInfo from './ServerStatus'
import GetSteamUsers from '../GetSteamUsers'

/**
 * * The main function to query a server, includes the chat logs and the players
 * * The function will check if the server has a rcon password (= if the server uses our plugin, the plugin will reload the password in the db)
 * * if it does, it will use the plugin to get the players and the server info
 * * if it doesn't, it will send a regular query to the server with source-query.
 *
 * @param serverId The server id
 * @param advanced Return advanced server info? (admins, chat messages, logs, etc.)
 */
const ServerQuery = async (serverId: number, advanced?: boolean): Promise<SafeServerInfo> => {
	const dbServer = await query.servers.getById(serverId)
	if (!dbServer) throw new Error('Server not found')

	const { hostname, address, rcon } = dbServer
	const [ip, port] = address.split(':')

	// If the server has a rcon password, use our plugin to get the players and the server info
	if (rcon) {
		const { server, players } = (await PluginStatus(ip, Number(port), rcon)) || {}
		if (!server || !players) throw new Error('Server not found')

		// Get the chat logs of 5 minutes ago
		const chatMessages = advanced ? await query.chatLogs.getAllByServerAndMinutes(Number(serverId), 5) : []

		const steamPlayers = await GetSteamUsers(players.map((p) => p.s64))

		const newPlayers: PlayerInfo[] = await Promise.all(
			players.map(async (player) => {
				const { id, s64, s, k, d, t } = player

				// Check if the player is an admin
				const admin = await query.admins.getBySteam64AndServerId(s64, serverId)

				const steam = steamPlayers.find((p: { steamid: string }) => p.steamid === s64)

				return {
					id,
					playerName: steam?.personaname,
					avatar: steam ? steam.avatar : '',
					s64,
					admin: advanced ? admin : null,
					k,
					d,
					s,
					t
				}
			})
		)

		const info: SafeServerInfo = {
			id: serverId,
			hostname,
			address,
			map: server.map,
			players: newPlayers,
			maxPlayers: server.mP,
			playersPercentage: Math.round((players.length / server.mP) * 100),
			vac: null,
			game: 'Counter-Strike 2',
			chat: {
				messages: chatMessages,
			},
		}
		return info
	} else {
		const info = await GetServerInfo(ip, Number(port), rcon)
		if (!info) throw new Error('Server not found')

		// Get the chat logs of 5 minutes ago
		const chatMessages = advanced ? await query.chatLogs.getAllByServerAndMinutes(Number(serverId), 5) : []

		const steamPlayers = await GetSteamUsers(info.serverPlayers?.map((player) => player.steamId64) || [])

		const players: PlayerInfo[] | number = info.serverPlayers
			? await Promise.all(
				info.serverPlayers?.map(async (player) => {
					const { id, name, steamId64 } = player

					const admin = await query.admins.getBySteam64AndServerId(steamId64, Number(serverId))

					const steam = steamPlayers.find((p: { steamid: string }) => p.steamid === steamId64)

					return {
						userId: id,
						steam64: steamId64,
						playerName: steam ? steam.personaname : name,
						avatar: steam ? steam.avatar : '',
						ping: 0,
						admin: advanced ? admin : null,
					}
				})
			)
			: info.players

		const results: SafeServerInfo = {
			id: serverId,
			hostname,
			address,
			playersPercentage: Math.round((info.players / info.maxPlayers) * 100),
			map: info.map,
			players: players,
			maxPlayers: info.maxPlayers,
			vac: info.VAC,
			game: info.game,
			chat: {
				messages: chatMessages,
			},
		}

		return results
	}
}

export interface SafeServerInfo {
	id: number
	hostname: string
	address: string
	players: PlayerInfo[] | number
	maxPlayers: number
	playersPercentage: number
	map: string
	vac: boolean | null
	game: string
	chat: {
		messages: SA_ChatLog[]
	}
	country?: string
}

export interface PlayerInfo {
	id?: number
	playerName?: string
	avatar?: string
	s64?: string
	admin: SA_Admin | null
	k?: string
	d?: string
	s?: number
	t?: number
}

export default ServerQuery
