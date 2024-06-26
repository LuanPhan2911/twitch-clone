"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/stores/use-sidebar";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Toggle = ({ title = "Home" }: { title?: string }) => {
  const { collapsed, onCollapse, onExpand } = useSidebar();

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">{title}</p>
          <ActionTooltip label={label} align="center" side="right" asChild>
            <Button
              asChild
              className="h-auto p-2 ml-auto"
              variant={"ghost"}
              onClick={onCollapse}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </ActionTooltip>
        </div>
      )}
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <ActionTooltip label={label} align="center" side="right" asChild>
            <Button className="p-2 h-auto" variant={"ghost"} onClick={onExpand}>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </ActionTooltip>
        </div>
      )}
    </>
  );
};
