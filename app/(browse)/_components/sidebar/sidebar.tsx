import { getRecommendList } from "@/lib/recommend-services";
import { Recommended } from "./recommended";

import { getFollowedUser } from "@/lib/follow-services";
import { Following } from "./following";
import { CommonSidebar } from "@/components/sidebar";

export const Sidebar = async () => {
  const recommended = await getRecommendList();

  const following = await getFollowedUser();
  return (
    <CommonSidebar title="For you">
      <Following data={following} />
      <Recommended data={recommended} />
    </CommonSidebar>
  );
};
