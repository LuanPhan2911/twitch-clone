import { URLCard } from "./_components/url-card";
import { getSelf } from "@/lib/auth-services";
import { getStreamByUserId } from "@/lib/stream-services";
import { KeyCard } from "./_components/key-card";
import { GenerateKeyButton } from "./_components/generate-key-modal";

const KeyPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId({
    userId: self.id,
  });
  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <GenerateKeyButton />
      </div>
      <div className="space-y-4">
        <URLCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeyPage;
