"use client";

import { useModal } from "@/stores/use-modal";
import { Button } from "../ui/button";
import { CommonModal } from "../modal";

import { useEffect, useState, useTransition } from "react";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

type Props = {
  bio: string | null;
};
export const BioModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const isOpenModal = isOpen && type === "edit-user";
  const [bio, setBio] = useState("");
  useEffect(() => {
    if (data?.user?.bio) {
      setBio(data?.user?.bio);
    }
  }, [data?.user]);
  const [isPending, startTransition] = useTransition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      updateUser({
        bio,
      })
        .then((data) => {
          toast.success("Update User bio success");
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <CommonModal isOpen={isOpenModal} title="Edit User Bio">
      <form className="space-y-7" onSubmit={onSubmit}>
        <Textarea
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
          placeholder="User bio"
          disabled={isPending}
          className="resize-none"
        />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant={"ghost"}
            disabled={isPending}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant={"primary"} type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </CommonModal>
  );
};

export const BioModalButton = ({ bio }: Props) => {
  const { onOpen } = useModal();
  const onClick = () => {
    onOpen("edit-user", {
      user: {
        bio,
      },
    });
  };
  return (
    <Button onClick={onClick} variant={"link"} size={"sm"} className="ml-auto">
      Edit
    </Button>
  );
};
