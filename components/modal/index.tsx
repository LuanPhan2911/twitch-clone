"use client";

import { useModal } from "@/stores/use-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type Props = {
  title: React.ReactNode | string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
};

export const CommonModal = ({
  title,
  description,
  children,
  isOpen,
}: Props) => {
  const { onClose } = useModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!!description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
