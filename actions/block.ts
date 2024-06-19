"use server";

import { getSelf } from "@/lib/auth-services";
import { blockUser, unBlockUser } from "@/lib/block-services";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();
  let blockedUser;
  try {
    //block login user
    blockedUser = await blockUser(id);
  } catch (error) {}

  try {
    //
    await roomService.removeParticipant(self.id, id);
  } catch (error) {}
  revalidatePath("/");
  revalidatePath(`/u/${self.username}/community`);
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocking.username}`);
  }
  return blockedUser;
};
export const onUnBlock = async (id: string) => {
  const unBlockedUser = await unBlockUser(id);

  revalidatePath("/");
  if (unBlockedUser) {
    revalidatePath(`/${unBlockedUser.blocking.username}`);
  }
  return unBlockedUser;
};
