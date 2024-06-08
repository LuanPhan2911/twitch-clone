import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
    },
  });
  if (!user) {
    throw new Error("Invalid User ");
  }
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
