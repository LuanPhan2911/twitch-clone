import { getCommunityUsers } from "@/lib/user-services";
import { FollowerUser, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CommunityPage = async () => {
  const data = await getCommunityUsers();
  const formatData = data.map(({ follower, createdAt }) => {
    return {
      followerId: follower.id,
      followerUsername: follower.username,
      followerImageUrl: follower.imageUrl,
      createdAt: createdAt,
      isBlocked: follower.blockedBy.length > 0,
    } as FollowerUser;
  });

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={formatData} />
      </div>
    </div>
  );
};

export default CommunityPage;
