"use client";
import { User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail, ThumbnailSkeleton } from "./thumbnail";
import LiveBadge from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avartar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

type Props = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
  } & {
    user: User;
  };
};
export const ResultCard = ({ data }: Props) => {
  return (
    <Link href={data.user.username}>
      <div className="w-full flex gap-x-4 relative group">
        <div className="h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        {data.isLive && data.thumbnailUrl && (
          <div
            className="absolute top-1 right-2 group-hover:translate-x-2 
          group-hover:-translate-y-2 transition-transform"
          >
            <LiveBadge />
          </div>
        )}
        <div className="flex flex-col gap-y-2">
          <p className="text-md font-bold">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.user.username}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(data.updatedAt, {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};
export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>

      <div className="flex flex-col">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};
