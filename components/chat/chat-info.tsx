"use client";
import { useMemo } from "react";
import ActionTooltip from "../action-tooltip";
import { Info } from "lucide-react";

type Props = {
  isDelayed: boolean;
  isFollowerOnly: boolean;
};
export const ChatInfo = ({ isDelayed, isFollowerOnly }: Props) => {
  const hint = useMemo(() => {
    if (!isDelayed && isFollowerOnly) {
      return "Only followers can chat.";
    }
    if (isDelayed && !isFollowerOnly) {
      return "Message is delayed after 3 seconds.";
    }
    if (isDelayed && isFollowerOnly) {
      return "Only followers can chat. Message is delayed after 3 seconds.";
    }
    return "";
  }, [isDelayed, isFollowerOnly]);
  const label = useMemo(() => {
    if (!isDelayed && isFollowerOnly) {
      return "Followers only!";
    }
    if (isDelayed && !isFollowerOnly) {
      return "Slow mode!";
    }
    if (isDelayed && isFollowerOnly) {
      return "Followers only and slow mode!";
    }
    return "";
  }, [isDelayed, isFollowerOnly]);

  if (!isDelayed && !isFollowerOnly) {
    return null;
  }
  return (
    <div
      className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md
    flex items-center gap-x-2"
    >
      <ActionTooltip label={hint}>
        <Info className="w-5 h-5" />
      </ActionTooltip>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
