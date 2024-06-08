"use client";
import { useViewToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";
type Props = {
  user: User & {
    stream: Stream | null;
  };
  stream: Stream;
  isFollowing: boolean;
};
export const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
  const { identity, name, token } = useViewToken(user.id);

  if (!token || !name || !identity) {
    return <div>Cannot watch stream</div>;
  }
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 
        xl:grid-cols-3 2xl:grid-cols-5 h-full"
      >
        <div
          className="space-y-4 col-span-1 lg:col-span-2 
        xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10"
        >
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  );
};
