import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/panel/user-nav";
import { SheetMenu } from "@/components/panel/sheet-menu";
import BanMenu from "../bans/sheet";
import { validateRequest } from "@/lib/auth";
import isAdmin from "@/lib/functions/isAdmin";
import MuteMenu from "../mutes/sheet";

interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  const { user } = await validateRequest()
  const is_admin = user ? await isAdmin(user.id!) : false

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {is_admin &&
            <MuteMenu admin={user!} />
          }
          {is_admin &&
            <BanMenu admin={user!} />
          }
          <ModeToggle />
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
