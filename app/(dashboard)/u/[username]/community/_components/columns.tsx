"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avartar";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { BlockButton } from "./block-button";

export type FollowerUser = {
  followerId: string;
  followerUsername: string;
  followerImageUrl: string;
  isBlocked: boolean;
  createdAt: Date | null;
};
export const columns: ColumnDef<FollowerUser>[] = [
  {
    accessorKey: "followerImageUrl",
    header: "Avatar",

    cell: ({ row }) => {
      const followerUser = row.original;
      const { followerImageUrl, followerUsername } = followerUser;
      return (
        <UserAvatar
          imageUrl={followerImageUrl}
          username={followerUsername}
          size={"lg"}
        />
      );
    },
  },
  {
    accessorKey: "followerUsername",
    header: "Username",
  },

  {
    accessorKey: "createdAt",
    header: "Follow on",
    cell: ({ row }) => {
      const followerUser = row.original;
      const { createdAt } = followerUser;
      if (!createdAt) {
        return "None follow";
      }
      return formatDistanceToNow(createdAt, {
        addSuffix: true,
      });
    },
  },
  {
    accessorKey: "isBlocked",
    header: "Status",
    cell: ({ row }) => {
      const followerUser = row.original;
      const { followerId, isBlocked } = followerUser;

      if (isBlocked) {
        return (
          <BlockButton
            followerId={followerId}
            name="unblock"
            isBlocked={isBlocked}
          />
        );
      }
      return (
        <BlockButton
          followerId={followerId}
          name="block"
          isBlocked={isBlocked}
        />
      );
    },
  },
];
