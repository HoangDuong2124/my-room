import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json()
        const res = await prisma.user.findUnique(
            {
                where:{
                    email:body.email,
                    password:body.password
                }
            }
        )
        if(res){
          return  NextResponse.redirect('room')
        }
        else console.log("Fail qua")
    } catch (error) {
        return NextResponse.json({ message: "failed" }, {
            status: 400
        })
    }
    
}