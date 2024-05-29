"use client";

import LiveBadge from "@/components/live-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avartar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
const UserItem = ({ imageUrl, isLive, username }: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "w-full h-14 flex",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && " justify-center"
          )}
        >
          <UserAvatar
            username={username}
            imageUrl={imageUrl}
            isLive={isLive}
            showBadge
          />
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};
const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
export { UserItem, UserItemSkeleton };
