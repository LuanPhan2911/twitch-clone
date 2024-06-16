"use client";
import { useViewToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/stores/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "../chat";
import { ChatToggle } from "../chat/chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
type Props = {
  user: User & {
    stream: Stream | null;
  };
  stream: Stream;
  isFollowing: boolean;
};
export const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
  const { identity, name, token } = useViewToken(user.id);
  const { collapsed } = useChatSidebar();
  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] z-50 right-2">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        className={cn(
          `grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 
        xl:grid-cols-3 2xl:grid-cols-6 h-full`,
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div
          className="space-y-4 col-span-1 lg:col-span-2 
        xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10"
        >
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostIdentity={user.id}
            hostName={user.username}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnable={stream.isChatEnable}
            isChatDelay={stream.isChatDelay}
            isChatFollowerOnly={stream.isChatFollowerOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
export const StreamPlayerSkeleton = () => {
  return (
    <div
      className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 
        xl:grid-cols-3 2xl:grid-cols-6 h-full"
    >
      <div
        className="space-y-4 col-span-1 lg:col-span-2 
        xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10"
      >
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
