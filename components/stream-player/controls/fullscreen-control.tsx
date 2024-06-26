"use client";

import { Maximize, Minimize } from "lucide-react";
import ActionTooltip from "../../action-tooltip";

type Props = {
  isFullScreen: boolean;
  onToggle: () => void;
};
export const FullScreenControl = ({ isFullScreen, onToggle }: Props) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit fullscreen" : "Enter fullscreen";
  return (
    <div className="flex items-center justify-center">
      <ActionTooltip label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="w-5 h-5" />
        </button>
      </ActionTooltip>
    </div>
  );
};
