import axios from 'axios'

const DiscordWebhook = async ({ url, content, embeds }: Webhook) => {
	try {
		const data = {
			username: 'Samatva',
			content,
			embeds,
		}

		await axios.post(url, data)
	} catch (err) {
		console.log('Error while sending a webhook', err)
	}
}

interface Webhook {
	url: string
	content?: string
	embeds?: Embed[]
}

interface Embed {
	title: string
	color?: number
	author: {
		name: string,
		url: string,
		icon_url: string
	},
	fields?: Field[]
	description?: string
	timestamp?: string
	footer?: {
		text: string,
		icon_url: string,
	},
}

interface Field {
	name: string
	value: string
	inline: boolean
}

export default DiscordWebhook
