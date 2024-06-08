import { FollowingUserStream } from "@/types";
import { getSelf } from "./auth-services";
import { db } from "./db";

export const isFollowingUser = async ({ id }: { id: string }) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (self.id === otherUser.id) {
      // default user following self;
      return true;
    }

    const existFollow = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: otherUser.id,
        },
      },
    });

    return !!existFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async ({ id }: { id: string }) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (self.id === otherUser.id) {
    // default user following self;
    throw new Error("Can not follow yourself");
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    },
  });

  if (existingFollow) {
    throw new Error("Already Following");
  }
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};
export const unFollowUser = async ({ id }: { id: string }) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (self.id === otherUser.id) {
    // default user following self;
    throw new Error("Can not unfollow yourself");
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }
  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });

  return follow;
};

export const getFollowedUser = async () => {
  try {
    const self = await getSelf();

    const follows = await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blockers: {
            none: {
              blockedId: self.id,
            },
          },
          blockedBy: {
            none: {
              blockerId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return follows;
  } catch (error) {
    return [];
  }
};
