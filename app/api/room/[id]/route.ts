import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(req:Request ,{params}:{
    params:{id:string}
}) {
    try {
        const getRoomID = await prisma.room.findUnique({
            where:{
                id:params.id
            }
          })
        return NextResponse.json(getRoomID)
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:400})
    }
    
} 