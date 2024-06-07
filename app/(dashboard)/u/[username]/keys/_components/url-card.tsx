"use client";
import { CopyButton } from "@/components/copy-button";
import { Input } from "@/components/ui/input";

type Props = {
  value: string | null;
};
export const URLCard = ({ value }: Props) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="Server Url" />
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  );
};
