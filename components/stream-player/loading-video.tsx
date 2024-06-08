"use client";
import { Loader } from "lucide-react";

type Props = {
  label: string;
};
export const LoadingVideo = ({ label }: Props) => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin " />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};
