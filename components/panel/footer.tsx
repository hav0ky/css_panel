import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    // <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
    //   <div className="mx-4 md:mx-8 flex h-14 items-center">
    //     <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
    //       Built on top of{" "}
    //       <Link
    //         href="https://ui.shadcn.com"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="font-medium underline underline-offset-4"
    //       >
    //         shadcn/ui
    //       </Link>
    //       . The source code is available on{" "}
    //       <Link
    //         href="https://github.com/salimi-my/shadcn-ui-sidebar"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="font-medium underline underline-offset-4"
    //       >
    //         GitHub
    //       </Link>
    //       .
    //     </p>
    //   </div>
    // </div>
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        {/* <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          Some footer.
        </p> */}
        <div className="flex gap-2">
          <Link href="https://samatva.gg" className="flex gap-1 items-center text-sm text-secondary-foreground hover:underline">
            Samatva
            <ExternalLink size={14} />
          </Link>
          <Link href="https://rp.samatva.gg" className="flex gap-1 items-center text-sm text-secondary-foreground hover:underline">
            Samatva RolePlay
            <ExternalLink size={14} />
          </Link>
          {/* <Link href="https://minecraft.samatva.gg" className="flex gap-1 items-center text-sm">
            Samatva
            <ExternalLink size={14} />
          </Link> */}
        </div>
      </div>
    </div>
  );
}
