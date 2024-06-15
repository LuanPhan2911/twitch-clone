"use client";

import { onBlock } from "@/actions/block";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { cn, stringToColor } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
};
export const CommunityItem = ({
  hostName,
  participantIdentity,
  participantName,
  viewerName,
}: Props) => {
  const color = stringToColor(participantName || "");
  const [isPending, startTransition] = useTransition();
  const isSelf = participantName === viewerName;
  const isHost = hostName === viewerName;
  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) {
      return;
    }
    startTransition(() => {
      onBlock({
        id: participantIdentity,
      })
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-center w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <ActionTooltip label="Block">
          <Button
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </ActionTooltip>
      )}
    </div>
  );
};
