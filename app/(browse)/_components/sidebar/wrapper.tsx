"use client";
import { useMedia } from "@/hooks/use-media";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
import { ReactNode, useEffect } from "react";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar();
  const { isLargeScreen } = useMedia();
  const isClient = useIsClient();
  useEffect(() => {
    if (isLargeScreen) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [isLargeScreen, onCollapse, onExpand]);
  if (!isClient) {
    return (
      <aside
        className="fixed h-full w-[70px] lg:w-60 bg-background flex flex-col
    left-0 border-r border-[#2d2d35] z-50 transition-all"
      >
        <ToggleSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        `fixed h-full w-60 bg-background flex flex-col 
      left-0 border-r border-[#2d2d35] z-50 transition-all`,
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
