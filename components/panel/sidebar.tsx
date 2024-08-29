import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/panel/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/panel/sidebar-toggle";
import Image from "next/image";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            <Image src="/img/logo.png" alt="logo" height={35} width={35} className="mr-2 -mt-1" />
            <div
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              {/* <Image src="/img/logo.png" alt="logo" height={35} width={35} className="-mt-1" /> */}
              <span className="z-10 font-medium -ml-2">Samatva</span>
            </div>
          </Link>
          {/* <Link href="/" className={cn(
            "flex items-center text-xl tracking-wider select-none gap-1.5 transition-[transform,opacity,display] ease-in-out duration-300",
            sidebar?.isOpen === false
              ? "-translate-x-96 opacity-0 hidden"
              : "translate-x-0 opacity-100"
          )}>
            <Image src="/img/logo.png" alt="logo" height={35} width={35} className="-mt-1" />
            <span className="z-10 font-medium">Samatva</span>
          </Link> */}
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
