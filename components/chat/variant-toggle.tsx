"use client";

import { ChatVariant, useChatSidebar } from "@/stores/use-chat-sidebar";
import { MessageSquare, Users } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar();
  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;
  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };
  const label = isChat ? "Community" : "Go back to chat";
  return (
    <ActionTooltip label={label} side="top" asChild>
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
