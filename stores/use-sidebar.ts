import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>((set) => {
  return {
    collapsed: true,
    onCollapse: () => set({ collapsed: true }),
    onExpand: () => set({ collapsed: false }),
  };
});
