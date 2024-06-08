import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { UserStream } from "@/types";

export const getRecommendList = async () => {
  try {
    const self = await currentUser();
    const user = await db.user.findUnique({
      where: {
        externalUserId: self?.id,
      },
    });

    let users;
    if (user) {
      users = await db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
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
        include: {
          stream: {
            select: {
              isLive: true,
            },
          },
        },
      });
    } else {
      users = await db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          stream: {
            select: {
              isLive: true,
            },
          },
        },
      });
    }

    return users;
  } catch (error) {
    return [];
  }
};
