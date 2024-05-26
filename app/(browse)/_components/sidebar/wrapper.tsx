"use client";
import { useMedia } from "@/hooks/use-media";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
import { ReactNode, useEffect } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar();
  const { isLargeScreen } = useMedia();
  useEffect(() => {
    if (isLargeScreen) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [isLargeScreen, onCollapse, onExpand]);
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
