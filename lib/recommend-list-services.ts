import { getSelf } from "./auth-services";
import { db } from "./db";

export const getRecommendList = async () => {
  const self = await getSelf();
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};
