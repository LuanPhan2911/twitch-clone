import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { getSelf } from "./auth-services";

export const getRecommendList = async () => {
  try {
    const self = await getSelf();
    return await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        id: {
          not: self.id,
        },
        followedBy: {
          none: {
            followerId: self.id,
          },
        },
        blockedBy: {
          none: {
            blockerId: self.id,
          },
        },
      },
      include: {
        stream: true,
      },
    });
  } catch (error) {
    return await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        stream: true,
      },
    });
  }
};
