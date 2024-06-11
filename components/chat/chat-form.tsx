"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChatInfo } from "./chat-info";

type Props = {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowerOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
};
export const ChatForm = ({
  isDelayed,
  isFollowerOnly,
  isFollowing,
  isHidden,
  onChange,
  onSubmit,
  value,
}: Props) => {
  const [isDelayBlocked, setDelayBlocked] = useState(false);
  const isFollowerOnlyAndNotFollowing = isFollowerOnly && !isFollowing;
  const isDisabled =
    isDelayBlocked || isFollowerOnlyAndNotFollowing || isHidden;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value || isDisabled) {
      return;
    }
    if (isDelayed && !isDelayBlocked) {
      setDelayBlocked(true);
      setTimeout(() => {
        setDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };
  if (isHidden) {
    return null;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowerOnly={isFollowerOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className={cn(
            "border-white/10",
            isFollowerOnly && "border-t-0 rounded-t-0"
          )}
          placeholder="Send a message"
          disabled={isDisabled}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant={"primary"} size={"sm"}>
          Send
        </Button>
      </div>
    </form>
  );
};
export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
