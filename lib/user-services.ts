import { getSelf } from "./auth-services";
import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatEnable: true,
          isChatDelay: true,
          isChatFollowerOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  return user;
};
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        stream: true,
      },
    });
    if (!user) {
      throw new Error("Invalid User ");
    }
    return user;
  } catch (error) {
    return null;
  }
};

export const getCommunityUsers = async () => {
  try {
    const self = await getSelf();

    const users = await db.follow.findMany({
      where: {
        followingId: self.id,
      },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
            blockedBy: {
              where: {
                blockerId: self.id,
              },
            },
          },
        },
        createdAt: true,
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};
