import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const getByID = await prisma.messenger.findMany({
      where: {
        idRoom: params.id,
      },
      orderBy: {
        sentAt: "asc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(getByID);
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const body = await req.json();
    const messagesInRoom = await prisma.messenger.findMany({
      where: { idRoom: params.id },
    });
    for (const message of messagesInRoom) {
      if (message!== null) {
        if (!message.viewedBy.includes(JSON.stringify(body))) {
          const updateViewMess = await prisma.messenger.update({
            where: { id: message.id },
            data: { viewedBy: { push: JSON.stringify(body) } },
          });
          return NextResponse.json(updateViewMess);
        }
      }
    }
    return NextResponse.json(messagesInRoom);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}
