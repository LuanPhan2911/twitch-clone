import { getSelf } from "./auth-services";
import { db } from "./db";

export const isBlockedByUser = async ({ id }: { id: string }) => {
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
    if (otherUser.id === self.id) {
      return false;
    }
    const block = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });
    return !!block;
  } catch (error) {
    return false;
  }
};
export const blockUser = async ({ id }: { id: string }) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }
  if (otherUser.id === self.id) {
    throw new Error("You cannot block yourself");
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (!!existingBlock) {
    throw new Error("User is already blocked");
  }
  const newBlock = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocking: true,
    },
  });
  return newBlock;
};

export const unBlockUser = async ({ id }: { id: string }) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    return null;
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("User never block");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocking: true,
    },
  });
  return unblock;
};
