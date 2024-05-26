"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query: {
          term: value,
        },
      },
      {
        skipEmptyString: true,
      }
    );
    router.push(url);
  };
  const onClear = () => {
    setValue("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent
        focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="w-5 h-5 absolute top-2.5 right-14 
          text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        variant={"secondary"}
        size={"sm"}
        className="rounded-l-none"
      >
        <SearchIcon className="w-5 h-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default SearchBar;
