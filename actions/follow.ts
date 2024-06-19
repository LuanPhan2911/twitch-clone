"use server";

import { followUser, unFollowUser } from "@/lib/follow-services";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const follow = await followUser(id);

    revalidatePath("/");
    if (follow) {
      revalidatePath(`/${follow.following.username}`);
    }
    return follow;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
export const onUnFollow = async (id: string) => {
  try {
    const follow = await unFollowUser(id);

    revalidatePath("/");
    if (follow) {
      revalidatePath(`/${follow.following.username}`);
    }
    return follow;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
