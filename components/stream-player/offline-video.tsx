"use client";
import { WifiOff } from "lucide-react";

type Props = {
  username: string;
};
export const OfflineVideo = ({ username }: Props) => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground " />
      <p className="text-muted-foreground">{username} is offline</p>
    </div>
  );
};
