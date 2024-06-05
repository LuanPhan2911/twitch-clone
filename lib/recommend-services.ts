import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getRecommendList = async () => {
  try {
    const self = await currentUser();
    const user = await db.user.findUnique({
      where: {
        externalUserId: self?.id,
      },
    });

    let users = [];
    if (user) {
      users = await db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        where: {
          id: {
            not: user.id,
          },
          followedBy: {
            none: {
              followerId: user.id,
            },
          },
          blockedBy: {
            none: {
              blockerId: user.id,
            },
          },
        },
      });
    } else {
      users = await db.user.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return users;
  } catch (error) {
    return [];
  }
};
