import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request, { params }: {
    params: { id: string }
}) {
    try {
        const getByID = await prisma.messenger.findFirst(
            {
                where:{
                    idRoom :params.id
                },
                orderBy:{
                    sentAt:"desc"
                }
            }
        )
        return NextResponse.json(getByID)
    } catch (error) {
        return NextResponse.json({message:"failed"},{status:400})
    }
}