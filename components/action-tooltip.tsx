"use client";

import { FunctionComponent } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ActionTooltipProps {
  label?: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  asChild?: boolean;
}

const ActionTooltip: FunctionComponent<ActionTooltipProps> = ({
  label,
  children,
  side,
  align,
  asChild,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} asChild={asChild}>
          <p className="font-semibold text-sm capitalize">
            {label?.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
