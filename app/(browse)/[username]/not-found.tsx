import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-full space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find user you were looking</p>
      <Button variant={"link"} asChild>
        <Link href={"/"}>Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
