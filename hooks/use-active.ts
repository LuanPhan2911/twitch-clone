"use client";

import { usePathname } from "next/navigation";

export const useActive = (value: string) => {
  const pathname = usePathname();

  const isActive = pathname === value;

  return { isActive };
};
