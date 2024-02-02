import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(req:Request) {
    try {
        const user = await prisma.user.findMany()         
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:400})
    }
    
} 