"use client";

import VerifyMark from "../verify-mark";
import { BioModalButton } from "./bio-modal";

type Props = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedCount: number;
};
export const AboutCard = ({
  bio,
  followedCount,
  hostIdentity,
  hostName,
  viewerIdentity,
}: Props) => {
  const hostAsViewer = `host:${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  const followerLabel = followedCount === 1 ? "follower" : "followers";
  return (
    <div className="px-4">
      <div className="rounded-xl group bg-background p-6 lg:p-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifyMark />
          </div>
          {isHost && <BioModalButton bio={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedCount}</span>{" "}
          {followerLabel}
        </div>
        <p className="text-sm">
          {bio || "This user prefers to keep an air of mystery about them"}
        </p>
      </div>
    </div>
  );
};
