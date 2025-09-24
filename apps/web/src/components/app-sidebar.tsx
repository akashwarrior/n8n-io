"use client"

import { NavItems } from "@/components/nav-items"
import { NavUser } from "@/components/nav-user"
import { NavHeader } from "@/components/nav-header"
import { Separator } from "./ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import {
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  header: [
    {
      name: "Workflow",
      Icon: GalleryVerticalEnd,
    },
    {
      name: "Credentials",
      Icon: Command,
    },
  ],
  navMain: [
    {
      name: "Home",
      url: "/home",
      Icon: Map,
    },
    {
      name: "Workflows",
      url: "/workflows",
      Icon: PieChart,
    },
    {
      name: "Credentials",
      url: "/credentials",
      Icon: BookOpen,
    },
    {
      name: "Executions",
      url: "/executions",
      Icon: Frame,
    },
    {
      name: "Settings",
      url: "/settings",
      Icon: Settings2,
    },
  ],
  extras: [
    {
      name: "Templates",
      url: "/templates",
      Icon: Frame,
    },
  ],
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="overflow-hidden">
      <SidebarHeader>
        <NavHeader teams={data.header} />
      </SidebarHeader>

      <Separator className="opacity-50" />

      <SidebarContent>
        <NavItems title="Default" projects={data.navMain} />
        <Separator className="opacity-50" />
        <NavItems title="Extras" projects={data.extras} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

    </Sidebar>
  )
}
