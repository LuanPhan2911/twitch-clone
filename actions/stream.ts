"use server";

import { getSelf } from "@/lib/auth-services";
import { db } from "@/lib/db";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onUpdateStream = async (values: Partial<Stream>) => {
  const self = await getSelf();
  const selfStream = await db.stream.findUnique({
    where: {
      userId: self.id,
    },
  });
  if (!selfStream) {
    throw new Error("Stream not found");
  }
  const validValues = {
    name: values.name,
    isChatEnable: values.isChatEnable,
    isChatDelay: values.isChatDelay,
    isChatFollowerOnly: values.isChatFollowerOnly,
  };

  const stream = await db.stream.update({
    where: {
      userId: self.id,
    },
    data: {
      ...validValues,
    },
  });

  revalidatePath(`/u/${self.username}/chat`);
  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return stream;
};
