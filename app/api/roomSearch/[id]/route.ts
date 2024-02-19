import prisma from "@/lib/prisma"
import { equal } from "assert"
import { NextResponse } from "next/server"
export async function GET(req:Request ,{params}:{
    params:{id:string}
}) {
    try {
        const getRoomID = await prisma.room.findMany({
            where:{
               name:{
                contains:params.id.trim(),
                mode: "insensitive"
               }
            }
          })
        return NextResponse.json(getRoomID)
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:400})
    }
    
} 