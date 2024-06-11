import { create } from "zustand";
export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}
interface useChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<useChatSidebarStore>((set) => {
  return {
    collapsed: false,
    variant: ChatVariant.CHAT,
    onCollapse: () => set({ collapsed: true }),
    onExpand: () => set({ collapsed: false }),
    onChangeVariant: (variant: ChatVariant) => set({ variant }),
  };
});
