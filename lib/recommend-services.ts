import { getSelf } from "./auth-services";
import { db } from "./db";

export const getRecommendList = async () => {
  try {
    const self = await getSelf();
    let users = [];
    if (self?.id) {
      users = await db.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          NOT: {
            id: self.id,
          },
        },
      });
    } else {
      users = await db.user.findMany({
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
