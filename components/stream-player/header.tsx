"use client";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avartar";
import VerifyMark from "../verify-mark";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

type Props = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name?: string;
};
export const Header = ({
  hostIdentity,
  hostName,
  imageUrl,
  isFollowing,
  name,
  viewerIdentity,
}: Props) => {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);
  const isLive = !!participant;
  const participantsCount = participants.length - 1;

  const hostAsViewer = `host:${hostIdentity}`;

  const isHost = viewerIdentity === hostAsViewer;
  return (
    <div
      className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 
    items-start justify-between p-4"
    >
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          isLive={isLive}
          size={"lg"}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifyMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive && (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-5 w-5" />
              <p>
                {participantsCount}
                {participantsCount === 1 ? " viewer" : " viewers"}
              </p>
            </div>
          )}
          {!isLive && (
            <div className="font-semibold text-xs text-muted-foreground">
              Offline
            </div>
          )}
        </div>
      </div>
      <Actions
        hostIdentity={hostIdentity}
        isFollowing={isFollowing}
        isHost={isHost}
      />
    </div>
  );
};
export const HeaderSkeleton = () => {
  return (
    <div
      className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 
    items-start justify-between p-4"
    >
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size={"lg"} />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};
