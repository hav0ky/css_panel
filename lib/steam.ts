import SteamAuth from "node-steam-openid";

const steamauth = new SteamAuth({
    realm: process.env.DOMAIN!,
    returnUrl: `${process.env.DOMAIN}/api/steam/callback`,
    apiKey: process.env.STEAM_API_KEY!,
});

export default steamauth