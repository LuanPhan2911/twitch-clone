import { searchStreams } from "@/lib/search-services";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  term: string;
};
export const Results = async ({ term }: Props) => {
  const data = await searchStreams(term);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try searching for something else.
        </p>
      )}
      <div
        className="flex flex-col gap-y-4
      "
      >
        {data.map((stream) => {
          return <ResultCard key={stream.id} data={stream} />;
        })}
      </div>
    </div>
  );
};
export const ResultSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div
        className="flex flex-col gap-y-4
      "
      >
        {[...Array(3)].map((_, i) => {
          return <ResultCardSkeleton key={i} />;
        })}
      </div>
    </div>
  );
};
