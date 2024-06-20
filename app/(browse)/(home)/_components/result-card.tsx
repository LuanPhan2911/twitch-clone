"use client";
import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail, ThumbnailSkeleton } from "./thumbnail";
import LiveBadge from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avartar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
  } & {
    user: User;
  };
};
export const ResultCard = ({ data }: Props) => {
  return (
    <Link href={data.user.username}>
      <div className="w-full h-full space-y-2 relative group">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        {data.isLive && (
          <div
            className="absolute top-1 right-2 group-hover:translate-x-2 
          group-hover:-translate-y-2 transition-transform"
          >
            <LiveBadge />
          </div>
        )}
        <div className="flex gap-x-3">
          <UserAvatar
            imageUrl={data.user.imageUrl}
            username={data.user.username}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-bold text-blue-500">{data.name}</p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-2">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
};
