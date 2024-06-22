"use client";
import { useViewToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/stores/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "../chat";
import { ChatToggle } from "../chat/chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
type Props = {
  host: {
    stream: {
      name: string;
      id: string;
      thumbnailUrl: string | null;
      isLive: boolean;
      isChatEnable: boolean;
      isChatDelay: boolean;
      isChatFollowerOnly: boolean;
    } | null;
    id: string;
    username: string;
    imageUrl: string;
    bio: string | null;
    _count: {
      followedBy: number;
    };
  };
  stream: {
    name: string;
    id: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    isChatEnable: boolean;
    isChatDelay: boolean;
    isChatFollowerOnly: boolean;
  };
  isFollowing: boolean;
};
export const StreamPlayer = ({ host, stream, isFollowing }: Props) => {
  const {
    identity: viewerIdentity,
    name: viewerName,
    token,
  } = useViewToken(host.id);
  const { collapsed } = useChatSidebar();
  if (!token || !viewerName || !viewerIdentity) {
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
          <Video hostName={host.username} hostIdentity={host.id} />
          <Header
            hostIdentity={host.id}
            hostName={host.username}
            viewerIdentity={viewerIdentity}
            imageUrl={host.imageUrl}
            isFollowing={isFollowing}
            name={stream?.name}
          />
          <InfoCard
            hostIdentity={host.id}
            viewerIdentity={viewerIdentity}
            name={stream?.name}
            thumbnailUrl={stream?.thumbnailUrl}
          />
          <AboutCard
            bio={host.bio}
            followedCount={host._count.followedBy}
            hostIdentity={host.id}
            hostName={host.username}
            viewerIdentity={viewerIdentity}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={viewerName}
            hostName={host.username}
            hostIdentity={host.id}
            isFollowing={isFollowing}
            isChatEnable={stream?.isChatEnable}
            isChatDelay={stream?.isChatDelay}
            isChatFollowerOnly={stream?.isChatFollowerOnly}
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
