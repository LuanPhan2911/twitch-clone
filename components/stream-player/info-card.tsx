"use client";

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModalButton } from "./info-modal";

type Props = {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string | null;
};
export const InfoCard = ({
  hostIdentity,
  name,
  thumbnailUrl,
  viewerIdentity,
}: Props) => {
  const hostAsViewer = `host:${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  if (!isHost) {
    return null;
  }
  return (
    <div className="px-4">
      <div className="bg-background rounded-md">
        <div className="flex items-center gap-x-2 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximum your visibility
            </p>
          </div>
          <InfoModalButton name={name} thumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-xs text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-xs text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div
                className="relative aspect-video rounded-md overflow-hidden w-[200px]
            border border-white/10"
              >
                <Image
                  src={thumbnailUrl}
                  fill
                  alt="Thumbnail"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
