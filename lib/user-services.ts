import { db } from "./db";

export const getUserByUsername = async ({ username }: { username: string }) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
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
