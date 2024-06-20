"use client";
import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Stream } from "@prisma/client";

export type ChatFieldType =
  | "isChatEnable"
  | "isChatDelay"
  | "isChatFollowerOnly";
interface ToggleCardProps {
  field: ChatFieldType;
  value: boolean;
  label: string;
  toastSuccessMessage?: string;
  onUpdate: (
    values: Partial<Record<ChatFieldType, boolean>>
  ) => Promise<Stream>;
}
export function ToggleCard({
  field,
  label,
  value,
  toastSuccessMessage,
  onUpdate,
}: ToggleCardProps) {
  const [isSpending, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      onUpdate({ [field]: !value })
        .then((stream) => {
          toast.success(toastSuccessMessage || "Update success");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isSpending}
            checked={value}
            onCheckedChange={onChange}
          >
            {" "}
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
}
export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full"></Skeleton>;
};
