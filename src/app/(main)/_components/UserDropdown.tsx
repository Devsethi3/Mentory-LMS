import {
  BookIcon,
  ChevronDownIcon,
  Home,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSignOut } from "@/hooks/use-signout";

interface UserDropdownProps {
  name: string;
  email: string;
  image: string;
}

export function UserDropdown({ name, email, image }: UserDropdownProps) {
  const handleSignOut = useSignOut();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-10 px-2 py-1.5 rounded-lg hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
        >
          <Avatar className="h-8 w-8 ring-2 ring-background shadow-sm">
            <AvatarImage src={image} alt={`${name}'s profile`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={14}
            className="text-muted-foreground transition-transform ui-open:rotate-180"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 p-2 mt-2 shadow-lg border-border/50"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-3 pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-border shadow-sm">
              <AvatarImage src={image} alt={`${name}'s profile`} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {name}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md cursor-pointer hover:bg-muted/80 focus:bg-muted/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                <Home size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Home</span>
                <span className="text-xs text-muted-foreground">
                  Dashboard overview
                </span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/courses"
              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md cursor-pointer hover:bg-muted/80 focus:bg-muted/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950/50">
                <BookIcon
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Courses</span>
                <span className="text-xs text-muted-foreground">
                  Learning content
                </span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md cursor-pointer hover:bg-muted/80 focus:bg-muted/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50">
                <LayoutDashboardIcon
                  size={16}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Dashboard</span>
                <span className="text-xs text-muted-foreground">
                  Admin panel
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/50 focus:bg-red-50 dark:focus:bg-red-950/50 text-red-600 dark:text-red-400 transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/50">
            <LogOutIcon size={16} className="text-red-600 dark:text-red-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Sign out</span>
            <span className="text-xs text-red-500/70 dark:text-red-400/70">
              End your session
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
