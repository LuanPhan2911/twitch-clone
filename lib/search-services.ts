import { getSelf } from "./auth-services";
import { db } from "./db";

export const searchStreams = async (term: string) => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  const streams = await db.stream.findMany({
    where: {
      ...(userId && {
        user: {
          blockers: {
            none: {
              blockedId: userId,
            },
          },
        },
      }),
      OR: [
        {
          name: {
            contains: term,
          },
        },
        {
          user: {
            username: {
              contains: term,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      thumbnailUrl: true,
      isLive: true,
      updatedAt: true,
      user: true,
    },
    orderBy: [
      {
        isLive: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return streams;
};
