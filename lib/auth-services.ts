import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getSelf = async () => {
  const self = await currentUser();
  if (!self) {
    throw new Error("Unauthenticated");
  }
  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });
  if (!user) {
    throw new Error("Invalid User");
  }
  return user;
};
