"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "/admin/team",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "/admin/capture",
      items: [
        {
          title: "Active Proposals",
          url: "/admin/capture/active",
        },
        {
          title: "Archived",
          url: "/admin/capture/archived",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "/admin/proposals",
      items: [
        {
          title: "Active Proposals",
          url: "/admin/proposals/active",
        },
        {
          title: "Archived",
          url: "/admin/proposals/archived",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "/admin/prompts",
      items: [
        {
          title: "Active Proposals",
          url: "/admin/prompts/active",
        },
        {
          title: "Archived",
          url: "/admin/prompts/archived",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/admin/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/admin/search",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...props}
    >
      <SidebarHeader className="border-b border-border/40 bg-muted/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3 group hover:bg-accent/50 transition-all duration-300"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/logo.svg"
                    width={32}
                    height={32}
                    alt="Mentory LMS logo"
                    className="group-hover:scale-110 transition-transform duration-300 ease-out"
                  />
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-lg opacity-0 dark:opacity-20 group-hover:opacity-40 transition-all duration-500 scale-150" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    Mentory LMS
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 space-y-6">
        <NavMain items={data.navMain} />

        {/* Divider */}
        <div className="h-px bg-border/60 mx-4" />

        <NavSecondary items={data.navSecondary} />
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 bg-muted/20 p-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
