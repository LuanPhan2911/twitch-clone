"use server";

import { blockUser, unBlockUser } from "@/lib/block-services";
import { revalidatePath } from "next/cache";

export const onBlock = async ({ id }: { id: string }) => {
  const blockedUser = await blockUser({ id });

  revalidatePath("/");
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocking.username}`);
  }
  return blockedUser;
};
export const onUnBlock = async ({ id }: { id: string }) => {
  const unBlockedUser = await unBlockUser({ id });

  revalidatePath("/");
  if (unBlockedUser) {
    revalidatePath(`/${unBlockedUser.blocking.username}`);
  }
  return unBlockedUser;
};
