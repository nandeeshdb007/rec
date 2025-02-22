"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
      };
    }

    const existingUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });
    if (existingUser) {
      return { status: 200, user: existingUser };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subcription: {
          create: {},
        },
        workSpace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workSpace: true,
        subcription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch {
    return { status: 400 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const notifications = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0) {
      return { status: 200, data: notifications };
    }

    return { status: 404 };
  } catch {
    return { status: 404 };
  }
};
