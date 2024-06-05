import { cn } from "@/lib/utils";
import Wrapper from "./wrapper";
import { SidebarItemSkeleton, ToggleSkeleton } from "./skeleton";
import { Toggle } from "./toggle";

interface CommonSidebarProps {
  children: React.ReactNode;
  title?: string;
}

export const CommonSidebar = ({ title, children }: CommonSidebarProps) => {
  return (
    <Wrapper>
      <Toggle title={title} />
      <div className="space-y-4 pt-4 lg:pt-0">{children}</div>
    </Wrapper>
  );
};

export const CommonSidebarSkeleton = () => {
  return (
    <aside
      className={cn(
        `fixed h-full w-[70px] bg-background flex flex-col 
  left-0 border-r border-[#2d2d35] z-50 lg:w-60`
      )}
    >
      <ToggleSkeleton />
      <SidebarItemSkeleton />
    </aside>
  );
};
