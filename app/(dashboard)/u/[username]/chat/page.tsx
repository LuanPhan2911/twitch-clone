import { onUpdateStream } from "@/actions/stream";
import { ToggleCard } from "@/components/toggle-card";
import { getSelf } from "@/lib/auth-services";
import { getStreamByUserId } from "@/lib/stream-services";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);
  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnable"
          label="Enable Chat"
          value={stream.isChatEnable}
          onUpdate={onUpdateStream}
          toastSuccessMessage="Chat setting update success"
        />
        <ToggleCard
          field="isChatDelay"
          label="Enable Chat Delay"
          value={stream.isChatDelay}
          onUpdate={onUpdateStream}
          toastSuccessMessage="Chat setting update success"
        />
        <ToggleCard
          field="isChatFollowerOnly"
          label="Enable Chat Follower Only"
          value={stream.isChatFollowerOnly}
          onUpdate={onUpdateStream}
          toastSuccessMessage="Chat setting update success"
        />
      </div>
    </div>
  );
};

export default ChatPage;
