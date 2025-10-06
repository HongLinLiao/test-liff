import { Pencil, AudioLines } from "lucide-react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const miniApp = [
  {
    name: "Draw",
    url: "/mini-app/draw",
    icon: Pencil,
  },
  {
    name: "Robo",
    url: "/mini-app/robo",
    icon: AudioLines,
  },
];

export const NavMiniApp = () => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>MINI APP</SidebarGroupLabel>
      <SidebarMenu>
        {miniApp.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
