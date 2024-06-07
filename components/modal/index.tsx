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
  cancelButton: React.ReactNode;
  confirmButton: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const CommonModal = ({
  cancelButton,
  confirmButton,
  title,
  description,
  children,
  isOpen,
  onClose,
}: Props) => {
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
        <div className="flex items-center justify-between">
          <DialogClose>{cancelButton}</DialogClose>
          {confirmButton}
        </div>
      </DialogContent>
    </Dialog>
  );
};
