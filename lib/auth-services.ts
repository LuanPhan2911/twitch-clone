import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getSelf = async () => {
  try {
    const self = await currentUser();
    if (!self) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        externalUserId: self.id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};
