import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-services";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: Props) => {
  const externalUser = await currentUser();
  const host = await getUserByUsername(params.username);
  if (!host || host.externalUserId !== externalUser?.id || !host.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer host={host} stream={host.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
