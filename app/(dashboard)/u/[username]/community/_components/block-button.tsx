"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  name: string;
  followerId: string;
  isBlocked: boolean;
}
export const BlockButton = ({ name, followerId, isBlocked }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleBlock = () => {
    startTransition(() => {
      onBlock(followerId)
        .then((data) =>
          toast.success(`Block username ${data?.blocking.username} success`)
        )
        .catch(() => toast.error("Something went wrong."));
    });
  };
  const handleUnBlock = () => {
    startTransition(() => {
      onUnBlock(followerId)
        .then((data) =>
          toast.success(`Unblock username ${data?.blocking.username} success`)
        )
        .catch(() => toast.error("Something went wrong."));
    });
  };
  const onClick = () => {
    if (isBlocked) {
      handleUnBlock();
    } else {
      handleBlock();
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      variant={isBlocked ? "primary" : "destructive"}
      className="capitalize"
    >
      {name}
    </Button>
  );
};
