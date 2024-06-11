"use client";

import { useChatSidebar } from "@/stores/use-chat-sidebar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";

export const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar();

  const Icon = collapsed ? ArrowLeft : ArrowRight;
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <ActionTooltip label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-5 w-5" />
      </Button>
    </ActionTooltip>
  );
};
