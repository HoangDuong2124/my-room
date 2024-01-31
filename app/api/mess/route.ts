import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Pusher from "pusher";

export async function POST(req:Request) {
    try {
        const body = await req.json()
        const send = await prisma.messenger.create({
            data:{
                idUser:body.idUser,
                idRoom:body.idRoom,
                messenger:body.messenger, 
            }
        })
        const pusher = new Pusher({
            appId: "1748057",
            key: "d137436b48d8b17e6ea1",
            secret: "32318421dc9c32d808eb",
            cluster: "ap1",
        }); 
      await pusher.trigger("chat-room", "send-message", {body});
        return NextResponse.json(send)
    } catch (error) {
        return NextResponse.json({ message: "failed" }, {
            status: 400
          })
    }
}