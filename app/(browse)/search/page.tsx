import { redirect } from "next/navigation";
import { ResultSkeleton, Results } from "./_components/results";
import { Suspense } from "react";

type Props = {
  searchParams: {
    term?: string;
  };
};
const SearchPage = ({ searchParams }: Props) => {
  if (!searchParams.term) {
    return redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
