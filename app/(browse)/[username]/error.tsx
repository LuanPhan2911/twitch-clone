"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col h-full space-y-4 items-center justify-center text-muted-foreground">
      <p>Something went wrong</p>
      <Button variant={"link"} asChild>
        <Link href={"/"}>Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
