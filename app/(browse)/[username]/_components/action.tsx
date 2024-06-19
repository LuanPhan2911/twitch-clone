"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}
export const Action = ({ isFollowing, userId }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      if (isFollowing) {
        onUnFollow(userId)
          .then((data) =>
            toast.success(`You are not now following ${data.follower.username}`)
          )
          .catch(() => toast.error("Something went wrong"));
      } else {
        onFollow(userId)
          .then((data) =>
            toast.success(`You are now following ${data.follower.username}`)
          )
          .catch(() => toast.error("Something went wrong"));
      }
    });
  };
  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`You block ${data?.blocking.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <>
      <Button disabled={isPending} variant={"primary"} onClick={handleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} variant={"default"} onClick={handleBlock}>
        Block
      </Button>
    </>
  );
};
