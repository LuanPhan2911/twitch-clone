"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
interface CommonSidebarItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  label?: string;
}
export const CommonSidebarItem = ({
  label,
  isActive,
  children,
}: CommonSidebarItemProps) => {
  const { collapsed } = useSidebar();

  return (
    <ActionTooltip label={label} align="center" side="right">
      <Button
        variant={"ghost"}
        className={cn(
          "w-full h-14 flex",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
      >
        {children}
      </Button>
    </ActionTooltip>
  );
};
