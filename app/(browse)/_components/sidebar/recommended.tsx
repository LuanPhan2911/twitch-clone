"use client";

import { useSidebar } from "@/stores/use-sidebar";
import { UserItem } from "./user-item";
import { User } from "@prisma/client";

interface RecommendedProps {
  data: (User & {
    stream: {
      isLive: boolean;
    } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar();
  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data?.map((user) => {
          return (
            <UserItem
              key={user.id}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={user?.stream?.isLive}
            />
          );
        })}
      </ul>
    </div>
  );
};
