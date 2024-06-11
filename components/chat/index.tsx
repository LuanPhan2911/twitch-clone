"use client";

import { ChatVariant, useChatSidebar } from "@/stores/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { ChatHeader } from "./chat-header";
import { useMediaQuery } from "react-responsive";
import { ChatForm } from "./chat-form";
import { ChatMessages } from "./chat-messages";

type Props = {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnable: boolean;
  isChatDelay: boolean;
  isChatFollowerOnly: boolean;
};
export const Chat = ({
  hostIdentity,
  hostName,
  isChatDelay,
  isChatEnable,
  isChatFollowerOnly,
  isFollowing,
  viewerName,
}: Props) => {
  const matched = useMediaQuery({
    maxWidth: 1024,
  });
  const { variant, onExpand } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnable || !isOnline;
  const [value, setValue] = useState("");

  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matched) {
      onExpand();
    }
  }, [onExpand, matched]);

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) {
      return;
    }
    send(value);
    setValue("");
  };
  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatMessages messages={reverseMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            isDelayed={isChatDelay}
            isFollowing={isFollowing}
            isFollowerOnly={isChatFollowerOnly}
            isHidden={isHidden}
            value={value}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <>
          <p>Community</p>
        </>
      )}
    </div>
  );
};
