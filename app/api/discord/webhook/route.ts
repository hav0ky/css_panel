import DiscordWebhook from "@/lib/functions/DiscordWebhook";

export async function POST(request: Request) {
    try {
        const { title, description, name, icon_url, id } = await request.json();

        const response = await DiscordWebhook({
            url: process.env.DISCORD_WEBHOOK_APPEAL!,
            embeds: [
                {
                    title,
                    description,
                    color: 0x000,
                    author: {
                        name,
                        icon_url,
                        url: `https://steamcommunity.com/profiles/${id}`
                    }
                }
            ]
        })

        return Response.json({ message: `${title} sent successfully!` });
    } catch (error) {
        return Response.json({ message: "Something went wrong :(" }, { status: 500 });
    }
}