"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
};
export const Actions = ({ hostIdentity, isFollowing, isHost }: Props) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow({ id: hostIdentity })
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Some thing went wrong"));
    });
  };
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow({ id: hostIdentity })
        .then((data) =>
          toast.success(`You are now unfollowing ${data.following.username}`)
        )
        .catch(() => toast.error("Some thing went wrong"));
    });
  };
  const onToggle = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) {
      return;
    }
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      disabled={isPending || isHost}
      onClick={onToggle}
      variant={"primary"}
      size={"sm"}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("w-5 h-5 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
