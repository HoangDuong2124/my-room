import { NextResponse } from "next/server";
import Pusher from "pusher";


export const GET = async (req: Request) => {

    try {
        var pusher = new Pusher({
            appId: "1748057",
            key: "d137436b48d8b17e6ea1",
            secret: "32318421dc9c32d808eb",
            cluster: "ap1",
        });

      await pusher.trigger("chat-room", "send-message", { });
        return NextResponse.json("OK")
    } catch (error) {

    }

}