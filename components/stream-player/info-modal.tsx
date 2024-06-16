"use client";

import { useModal } from "@/stores/use-modal";
import { Button } from "../ui/button";
import { CommonModal } from "../modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { onUpdateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";
import Image from "next/image";
import { Trash } from "lucide-react";

type Props = {
  initialName: string;
  initialThumbnailUrl: string | null;
};
export const InfoModal = () => {
  const { isOpen, type, data, onClose } = useModal();
  const isOpenModal = isOpen && type === "edit-stream-info";
  const [name, setName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (data?.initialName) {
      setName(data?.initialName);
    }
    if (data?.initialThumbnailUrl) {
      setThumbnailUrl(data?.initialThumbnailUrl);
    }
  }, [data?.initialName, data?.initialThumbnailUrl]);
  const [isPending, startTransition] = useTransition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(() => {
      onUpdateStream({
        name: name,
      })
        .then((data) => {
          toast.success("Stream updated");
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const onRemove = () => {
    startTransition(() => {
      onUpdateStream({
        thumbnailUrl: null,
      })
        .then(() => {
          toast.success("Remove thumbnail success");
          setThumbnailUrl("");
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <CommonModal isOpen={isOpenModal} title="Edit Stream Info">
      <form className="space-y-14" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Stream name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isPending}
          />
        </div>
        {thumbnailUrl ? (
          <div className="space-y-2">
            <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10">
              <div className="absolute top-2 right-2 z-[10]">
                <ActionTooltip label="Remove thumbnail" asChild>
                  <Button type="button" disabled={isPending} onClick={onRemove}>
                    <Trash className="h-5 w-5" />
                  </Button>
                </ActionTooltip>
              </div>
              <Image
                src={thumbnailUrl}
                fill
                alt="Thumbnail"
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="rounded-xl border outline-dashed outline-muted">
              <UploadDropzone
                endpoint="thumbnailUploader"
                appearance={{
                  label: {
                    color: "#ffffff",
                  },
                  allowedContent: {
                    color: "#ffffff",
                  },
                }}
                onClientUploadComplete={(res) => {
                  setThumbnailUrl(res?.[0]?.url);
                  router.refresh();
                }}
              />
            </div>
          </div>
        )}
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

export const InfoModalButton = ({
  initialName,
  initialThumbnailUrl,
}: Props) => {
  const { onOpen } = useModal();
  const onClick = () => {
    onOpen("edit-stream-info", {
      initialName,
      initialThumbnailUrl,
    });
  };
  return (
    <Button onClick={onClick} variant={"link"} size={"sm"} className="ml-auto">
      Edit
    </Button>
  );
};
