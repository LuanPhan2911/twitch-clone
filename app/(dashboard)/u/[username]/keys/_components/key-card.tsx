"use client";

import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  value: string | null;
};
export const KeyCard = ({ value }: Props) => {
  const [isShown, setShown] = useState(false);
  const onShow = () => {
    setShown((prev) => {
      return !prev;
    });
  };
  const btnLabel = isShown ? "Hide" : "Show";
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={isShown ? "text" : "password"}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value} />
          </div>
          <Button size={"sm"} variant={"link"} onClick={onShow}>
            {btnLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
