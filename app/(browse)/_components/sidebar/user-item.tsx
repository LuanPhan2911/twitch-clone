"use client";

import LiveBadge from "@/components/live-badge";
import { CommonSidebarItem } from "@/components/sidebar/item";

import { UserAvatar } from "@/components/user-avartar";
import { useActive } from "@/hooks/use-active";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
import Link from "next/link";
interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}
export const UserItem = ({ imageUrl, isLive, username }: UserItemProps) => {
  const { collapsed } = useSidebar();

  const href = `/${username}`;
  const { isActive } = useActive(href);

  return (
    <CommonSidebarItem isActive={isActive} label={username}>
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
    </CommonSidebarItem>
  );
};
