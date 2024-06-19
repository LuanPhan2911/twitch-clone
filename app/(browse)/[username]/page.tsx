import { isFollowingUser } from "@/lib/follow-services";
import { getUserByUsername } from "@/lib/user-services";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/block-services";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const host = await getUserByUsername(params?.username);
  if (!host || !host.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(host.id);
  const isBlocked = await isBlockedByUser(host.id);
  if (isBlocked) {
    notFound();
  }
  return (
    <StreamPlayer host={host} stream={host.stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
