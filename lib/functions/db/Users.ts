import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_User } from '@/types/db/plugin'
import db from '@/lib/mysql'

const fields = ['id', 'player_name', 'player_avatar', 'ip']

interface SA_UserDB extends SA_User, RowDataPacket { }

const Users = {
    getAll: async (page: number = 1, limit: number = 100000): Promise<SA_User[]> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>(
                `SELECT * FROM \`sa_users\` LIMIT ${limit} OFFSET ${(page - 1) * limit}`
            )

            // rows.forEach((admin) => {
            //     if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
            //     if (admin.flags && !(admin.flags as string).startsWith('#')) {
            //         admin.flags = (admin.flags as string).split(',') as Flag[]
            //     }
            // })

            return rows
        } catch (err) {
            console.log(`[DB] Error while getting all users: ${err}`)
            return []
        }
    },
    getById: async (userId: string): Promise<SA_User | null> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>('SELECT * FROM `sa_users` WHERE id = ?', [userId])
            if (!rows.length || rows.length < 1) return null

            const user = rows[0]
            // if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
            // if (admin.flags && !(admin.flags as string).startsWith('#')) {
            //     admin.flags = (admin.flags as string).split(',') as Flag[]
            // }

            return user
        } catch (err) {
            console.log(`[DB] Error while getting the admin: ${err}`)
            return null
        }
    },
    create: async ({ id, player_name, player_avatar, ip }: SA_User): Promise<number | null> => {
        try {
            const [rows] = await db.query<ResultSetHeader>(
                `INSERT INTO \`sa_users\` (${fields.join(', ')}, created) VALUES (${fields
                    .map(() => '?')
                    .join(', ')}, NOW())`,
                [
                    id,
                    player_name,
                    player_avatar,
                    ip
                ]
            )

            return rows.insertId
        } catch (err) {
            console.log(`[DB] Error while creating sa_admins: ${err}`)
            throw err
        }
    },
    // update: async ({ id, player_steamid, player_name, flags, immunity, server_id }: SA_Admin): Promise<boolean> => {
    //     try {
    //         const [rows] = await db.query<ResultSetHeader>(
    //             `UPDATE \`sa_admins\` SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
    //             [
    //                 id,
    //                 player_steamid,
    //                 player_name,
    //                 typeof flags === 'string' ? flags : flags.join(','),
    //                 immunity,
    //                 server_id && server_id.join(','),
    //                 null,
    //                 id,
    //             ]
    //         )

    //         return rows.affectedRows > 0
    //     } catch (err) {
    //         console.log(`[DB] Error while updating admin: ${err}`)
    //         throw err
    //     }
    // },
    // delete: async (adminId: number): Promise<boolean> => {
    //     try {
    //         const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_admins` WHERE id = ?', [adminId])

    //         return rows.affectedRows > 0
    //     } catch (err) {
    //         console.log(`[DB] Error while deleting admin: ${err}`)
    //         throw err
    //     }
    // },
    count: async (): Promise<number> => {
        try {
            const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_admins`')
            return rows?.[0]?.['COUNT(*)']
        } catch (err) {
            console.log(`[DB] Error while counting admins: ${err}`)
            return 0
        }
    },
}

export default Users
