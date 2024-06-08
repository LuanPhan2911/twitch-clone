import { Follow, Stream, User } from "@prisma/client";

export type FollowingUserStream = Follow & {
  following: User & {
    stream: Stream | null;
  };
};
export type UserStream = User & {
  stream: Stream | null;
};
