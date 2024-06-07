"use client";

import { CheckCheck, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  value: string | null;
};
export const CopyButton = ({ value }: Props) => {
  const [isCopy, setCopy] = useState(false);
  const onCopy = () => {
    if (!value) {
      return;
    }

    setCopy(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
  const Icon = isCopy ? CheckCheck : Copy;
  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopy}
      variant={"ghost"}
      size={"icon"}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};
