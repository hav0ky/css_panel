import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  Ban,
  LineChart,
  MicOff,
  Home,
  Brush,
  MessageSquareWarning,
  TriangleAlert,
  CircleOff,
  ExternalLink
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Dashboard",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname == "/",
          icon: Home,
          submenus: []
        },
        {
          href: "/ranks?page=1",
          label: "Ranks",
          active: pathname.includes("/ranks"),
          icon: LineChart,
          submenus: []
        },
        {
          href: "/bans?page=1",
          label: "Bans",
          active: pathname.includes("/bans"),
          icon: Ban,
          submenus: []
        },
        {
          href: "/mutes?page=1",
          label: "Mutes",
          active: pathname.includes("/mutes"),
          icon: MicOff,
          submenus: []
        },
        {
          href: "/skins",
          label: "Skins",
          active: pathname.includes("/skins"),
          icon: Brush,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Appeals and Reports",
      menus: [
        {
          href: "/report",
          label: "Report Player",
          active: pathname.includes("/report"),
          icon: TriangleAlert,
          submenus: []
        },
        {
          href: "/appeal",
          label: "Appeal Ban",
          active: pathname.includes("/appeal"),
          icon: CircleOff,
          submenus: []
        }
      ]
    },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       active: pathname.includes("/users"),
    //       icon: Users,
    //       submenus: []
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       active: pathname.includes("/account"),
    //       icon: Settings,
    //       submenus: []
    //     }
    //   ]
    // },
    {
      groupLabel: "Socials",
      menus: [
        {
          href: "https://discord.com",
          label: "Discord",
          active: false,
          icon: ExternalLink,
          submenus: []
        },
        // {
        //   href: "/account",
        //   label: "Account",
        //   active: pathname.includes("/account"),
        //   icon: Settings,
        //   submenus: []
        // }
      ]
    }
  ];
}
