"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
    badge?: string;
    external?: boolean;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  // Function to check if current path matches the nav item
  const isActive = (url: string) => {
    if (url === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(url) && url !== "#";
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2">
        Quick Actions
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => {
            const active = isActive(item.url);
            const isPlaceholder = item.url === "#";

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild={!isPlaceholder}
                  tooltip={item.title}
                  className={cn(
                    "group relative transition-all duration-200 ease-out h-9",
                    "hover:bg-muted/60 hover:text-muted-foreground",
                    "text-muted-foreground/80",
                    active && ["bg-muted text-foreground", "shadow-sm"],
                    isPlaceholder && [
                      "opacity-50 cursor-not-allowed",
                      "hover:bg-transparent hover:text-muted-foreground/80",
                    ]
                  )}
                  data-active={active}
                  disabled={isPlaceholder}
                >
                  {isPlaceholder ? (
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className="size-4 opacity-60" />
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="ml-auto text-xs bg-muted-foreground/10 px-1.5 py-0.5 rounded text-muted-foreground/60">
                        Soon
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 w-full"
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <div
                        className={cn(
                          "transition-all duration-200",
                          active && "text-foreground",
                          "group-hover:scale-105"
                        )}
                      >
                        <item.icon className="size-4" />
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium transition-all duration-200",
                          active && "text-foreground font-semibold"
                        )}
                      >
                        {item.title}
                      </span>

                      {/* Badge for notifications/status */}
                      {item.badge && (
                        <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}

                      {/* External link indicator */}
                      {item.external && (
                        <svg
                          className="ml-auto size-3 opacity-50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}

                      {/* Subtle hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
