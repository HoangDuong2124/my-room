import prisma from "@/lib/prisma";
import { room } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  try {
    const res = await prisma.room.findMany({
      include: {
        messengers: {
          select: {
            id: true,
            messenger: true,
            sentAt: true,
          },
          orderBy: {
            sentAt: "desc",
          },
          take: 1,
        },
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const send = await prisma.room.create({
      data: {
        id: body.id,
        name: body.name,
      },
    });
    return NextResponse.json(send);
  } catch (error) {
    return NextResponse.json(
      { message: "failed" },
      {
        status: 400,
      }
    );
  }
}
