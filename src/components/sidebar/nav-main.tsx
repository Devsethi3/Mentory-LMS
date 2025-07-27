"use client";

import { IconCirclePlusFilled, IconSparkles, type Icon } from "@tabler/icons-react";
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
import { Badge } from "@/components/ui/badge";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    badge?: string;
  }[];
}) {
  const pathname = usePathname();
  
  // Function to check if current path matches the nav item
  const isActive = (url: string) => {
    if (url === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
        Navigation
      </SidebarGroupLabel>
      <SidebarGroupContent className="space-y-1">
        {/* Quick Create Button - Only show in admin routes */}
        {pathname.startsWith("/admin") && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Quick Create Course"
                className={cn(
                  "group relative overflow-hidden",
                  "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
                  "hover:from-blue-700 hover:to-purple-700",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300 ease-out",
                  "border-0 h-10"
                )}
              >
                <Link href="/admin/courses/create" className="flex items-center gap-3">
                  <IconCirclePlusFilled className="size-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-medium">Quick Create</span>
                  <IconSparkles className="size-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}

        {/* Main Navigation Items */}
        <SidebarMenu className="space-y-1">
          {items.map((item) => {
            const active = isActive(item.url);
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title} 
                  asChild
                  className={cn(
                    "group relative transition-all duration-200 ease-out h-10",
                    "hover:bg-accent/60 hover:text-accent-foreground",
                    "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
                    active && [
                      "bg-gradient-to-r from-primary/10 to-primary/5",
                      "text-primary border-r-2 border-primary/40",
                      "shadow-sm"
                    ]
                  )}
                  data-active={active}
                >
                  <Link href={item.url} className="flex items-center gap-3 w-full">
                    {item.icon && (
                      <div className={cn(
                        "relative transition-all duration-200",
                        active && "text-primary"
                      )}>
                        <item.icon className={cn(
                          "size-4 transition-all duration-200",
                          active && "scale-110"
                        )} />
                        {active && (
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm scale-150" />
                        )}
                      </div>
                    )}
                    <span className={cn(
                      "font-medium transition-all duration-200",
                      active && "text-primary font-semibold"
                    )}>
                      {item.title}
                    </span>
                    
                    {/* Badge for notifications/counts */}
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="ml-auto text-xs h-5 px-1.5 bg-muted-foreground/10"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    
                    {/* Active indicator line */}
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full opacity-80" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}