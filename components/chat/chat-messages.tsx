import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";

type Props = {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
};
export const ChatMessages = ({ messages, isHidden }: Props) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground font-semibold">
          {isHidden ? "Chat is disabled" : "Welcome to chat!"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => {
        return <ChatMessage message={message} key={message.timestamp} />;
      })}
    </div>
  );
};
export const ChatMessagesSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 flex-1 p-3 h-full">
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
