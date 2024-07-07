import { Agent } from "@/types/skins";
import axios from "axios"

const filterAgentsData = (agents: Agent[]): Agent[] => {
    return agents.filter(agent => agent.image !== '' && agent.model !== 'null');
};

export async function GET(request: Request) {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/Nereziel/cs2-WeaponPaints/main/website/data/agents.json")
        const filtered = filterAgentsData(response.data)
        return Response.json(filtered)
    } catch (error) {
        return Response.json({ message: "Not Found" }, { status: 500 })
    }
}
