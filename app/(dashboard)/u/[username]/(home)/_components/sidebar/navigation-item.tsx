"use client";

import { CommonSidebarItem } from "@/components/sidebar/item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavigationItemProps {
  label: string;
  href: string;
  isActive: boolean;
  icon: LucideIcon;
}
export const NavigationItem = ({
  href,
  icon: Icon,
  isActive,
  label,
}: NavigationItemProps) => {
  const { collapsed } = useSidebar();

  return (
    <CommonSidebarItem label={label}>
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("w-4 h-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </CommonSidebarItem>
  );
};
