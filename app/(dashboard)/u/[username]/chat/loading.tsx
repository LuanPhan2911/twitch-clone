import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./toggle-card";

const ChatLoading = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => {
          return <ToggleCardSkeleton key={i} />;
        })}
      </div>
    </div>
  );
};

export default ChatLoading;
