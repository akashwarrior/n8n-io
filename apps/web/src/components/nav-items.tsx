"use client"

import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavItems({
  title,
  projects,
}: {
  title?: string,
  projects: {
    name: string
    url: string
    Icon: LucideIcon
    isActive?: boolean,
  }[]
}) {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {projects.map(({ Icon, name, url, isActive }) => (
          <SidebarMenuItem key={name}>
            <SidebarMenuButton asChild isActive={isActive ?? pathname?.startsWith(url)} title={name}>
              <Link href={url}>
                <Icon />
                <span>{name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
