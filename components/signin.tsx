"use client"
import { Button } from "@/components/ui/button";
import next_axios from "@/lib/axios";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const SignInButton = () => {
    const router = useRouter()
    const SteamRedirect = async () => {
        const url = await next_axios.get('/api/steam/signin')
        router.push(url.data.url)
    }

    return (
        <Button type="submit" size="sm" className="rounded-full" onClick={SteamRedirect}>
            <LogIn className='mr-1.5' size={16} />
            SignIn
        </Button>
    )
}

export default SignInButton