import { Button } from "@/components/ui/button";
import { isFollowingUser } from "@/lib/follow-services";
import { getUserByUsername } from "@/lib/user-services";
import { notFound } from "next/navigation";
import { Action } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-services";

interface UserPageProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params?.username);
  if (!user) {
    return notFound();
  }

  const isFollowing = await isFollowingUser({ id: user.id });
  const isBlocked = await isBlockedByUser({ id: user.id });
  if (isBlocked) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-y-1">
      <p>Username: {user.username}</p>
      <p>UserID: {user.id}</p>
      <p>Following: {`${isFollowing}`}</p>
      <Action isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
