import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await prisma.user.findMany()
   return NextResponse.json(res)
}
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const add = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })
        return NextResponse.json(add)
    } catch (error) {
        return NextResponse.json({ message: "failed" }, {
            status: 400
        })
    }
}