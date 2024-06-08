"use client";

import ActionTooltip from "@/components/action-tooltip";
import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";

type Props = {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
};
export const VolumeControl = ({ onChange, onToggle, value }: Props) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;
  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }
  const label = isMuted ? "Unmute" : "Mute";
  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };
  return (
    <div className="flex items-center gap-2">
      <ActionTooltip asChild label={label}>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="w-5 h-5" />
        </button>
      </ActionTooltip>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      ></Slider>
    </div>
  );
};
