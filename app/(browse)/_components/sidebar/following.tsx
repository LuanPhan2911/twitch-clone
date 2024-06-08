"use client";
import { useSidebar } from "@/stores/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem } from "./user-item";
import { FollowingUserStream } from "@/types";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: {
        isLive: boolean;
      } | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (!data?.length) {
    return null;
  }
  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data?.map(({ following: user }) => {
          return (
            <UserItem
              key={user.id}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={user.stream?.isLive}
            />
          );
        })}
      </ul>
    </div>
  );
};
