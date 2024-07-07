"use client"
import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import next_axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/provider";
import SignInButton from "../signin";

export function UserNav() {

  const { user } = useSession()

  const router = useRouter()

  const signOut = async () => {
    toast.promise(
      next_axios.get('/api/steam/signout'), {
      loading: 'Signing out now. Come back soon!',
      success: (data) => {
        router.refresh()
        router.push('/')
        return `Signed out successfully!`;
      },
      error: 'Something went wrong :(',
    });
  }

  if (!user) {
    return (
      <SignInButton />
    )
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.player_avatar} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">hvk</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.player_name}</p>
            <a href={`https://steamcommunity.com/profiles/${user.id}`} target="_blank" className="text-xs w-fit leading-none text-muted-foreground">
              {user.id}
            </a>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="hover:cursor-pointer"> */}

        <Button type="submit" className="w-full flex justify-start h-8 font-normal pl-2.5" variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-3.5 h-3.5 mr-3 text-muted-foreground" />
          Sign out
        </Button>
        {/* </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
