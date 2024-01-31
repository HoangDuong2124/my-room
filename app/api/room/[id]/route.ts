import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(req:Request ,{params}:{
    params:{id:string}
}) {
    try {
        const getByID = await prisma.room.findUnique({
            where:{
                id:params.id
            }
          })
        return NextResponse.json(getByID)
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:400})
    }
    
} 