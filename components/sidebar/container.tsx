"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";
import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("flex-1 pl-60", collapsed && "pl-[70px]")}>
      {children}
    </div>
  );
};
