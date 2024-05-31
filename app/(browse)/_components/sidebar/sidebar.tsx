import { getRecommendList } from "@/lib/recommend-services";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";
import { cn } from "@/lib/utils";
import { getFollowedUser } from "@/lib/follow-services";
import { Following, FollowingSkeleton } from "./following";

const Sidebar = async () => {
  const recommended = await getRecommendList();

  const following = await getFollowedUser();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

const SidebarSkeleton = () => {
  return (
    <aside
      className={cn(
        `fixed h-full w-[70px] bg-background flex flex-col 
  left-0 border-r border-[#2d2d35] z-50 lg:w-60`
      )}
    >
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
export { Sidebar, SidebarSkeleton };