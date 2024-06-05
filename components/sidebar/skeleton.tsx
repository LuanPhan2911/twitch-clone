import { Skeleton } from "../ui/skeleton";

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
export const SidebarItemSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => {
        return (
          <li className="flex items-center gap-x-4 px-3 py-2" key={i}>
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6" />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
