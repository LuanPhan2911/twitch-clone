import { Stream, User } from "@prisma/client";
import { create } from "zustand";
export type ModalType = "create-ingress" | "edit-stream-info" | "edit-user";
interface ModalData {
  stream?: Partial<Stream>;
  user?: Partial<User>;
}
interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => {
  return {
    isOpen: false,
    type: null,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null, data: {} }),
  };
});
