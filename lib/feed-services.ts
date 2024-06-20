import { getSelf } from "./auth-services";
import { db } from "./db";

export const getStreams = async () => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }
  let streams;
  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          blockedBy: {
            none: {
              blockerId: userId,
            },
          },
          blockers: {
            none: {
              blockedId: userId,
            },
          },
        },
      },
      select: {
        id: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
        user: true,
      },
    });
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        thumbnailUrl: true,
        name: true,
        isLive: true,
        user: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }
  return streams;
};
